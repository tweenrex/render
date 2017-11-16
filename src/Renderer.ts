import { IRendererOptions, ITargetRenderer, IRenderOptions, ValueType } from './types'

const min = Math.min
const max = Math.max
const isArray = Array.isArray
const cssVarExp = /^\-\-[a-z0-9\-]+$/i
const numberExp = /^\s*(\-?\d*\.?\d+)\s*$/

function linear(o: number): number {
    return o
}

function isDOM(target: any) {
    return target instanceof Element
}

function pushAll<T>(a: T[], b: T[]) {
    a.push.apply(a, b)
}

export function hyphenate(value: string): string {
    return value.replace(/([A-Z])/g, match => `-` + match[0].toLowerCase())
}

const mixers = {
    number(a: number, b: number, offset: number): any {
        return a + (b - a) * offset
    },
    discrete(a: any, b: any, offset: number): any {
        return offset < 0.5 ? a : b
    }
}

function resolve(targets: any): any[] {
    const results: any[] = []
    resolveInner(targets, results)
    return results;
}
function resolveInner(targets: any, results: any[]): void {
    if (isArray(targets)) {
        // recursive call
        targets.forEach(target => resolveInner(target, results))
    } else if (typeof targets === 'string') {
        // resolve NodeList
        pushAll(results, document.querySelectorAll(targets) as any)
    } else {
        results.push(targets)
    }
}

function parse(values: any[]): any {
    if (numberExp.test(values[0])) {
        return values.map(parseNumber)
    }
    return values
}

function getDataType(values: any[]): ValueType {
    if (typeof values[0] === 'number') {
        return 'number'
    }
    return 'discrete'
}

export function Renderer(ro: IRendererOptions) {
    return (opts: IRenderOptions) => {
        // resolve targets
        const targets = (ro.resolve || resolve)(opts.targets)
        const easing = opts.easing || linear

        // get renderers for each target and property
        const renderers: ITargetRenderer[] = []
        targets.forEach(target => {
            for (let prop in opts) {
                if (prop === 'targets') {
                    // skip targets
                    continue
                }

                // detect target type and assign value/render functions
                let valueFn: (target: HTMLElement, prop: string) => any
                let renderFn
                let isHyphenated: boolean
                let propHyphenated: string

                if (!isDOM(target)) {
                    // non-dom targets just use object properties
                    renderFn = renderProperty
                    valueFn = getProperty
                } else {
                    // assert type for auto-complete
                    const el = target as HTMLElement

                    if (cssVarExp.test(prop)) {
                        // props that start with -- are css variables
                        renderFn = renderVariable
                        valueFn = getVariable
                    } else if (typeof el.style[prop] !== 'undefined') {
                        // if style has the prop, use the style
                        renderFn = renderStyle
                        valueFn = getStyle
                    } else {
                        // hyphenate property name to check for attribute (hyphenated)
                        propHyphenated = hyphenate(prop)
                        isHyphenated = el.hasAttribute(propHyphenated)
                        if (isHyphenated || el.hasAttribute(prop)) {
                            // if attribute is present, use attribute
                            renderFn = renderAttribute
                            valueFn = getAttribute
                        } else {
                            // otherwise use property (innerHTML, etc.)
                            renderFn = renderProperty
                            valueFn = getProperty
                        }
                    }
                }

                // get first value if this is a transition
                let rawValues = opts[prop]
                if (!isArray(rawValues)) {
                    rawValues = [valueFn(target, prop), rawValues]
                }

                // parse values
                const values = (ro.parse || parse)(rawValues)
                const type = opts.type || getDataType(values)

                // set or detect mix function
                const mix = ro.mix || mixers[type]

                // add to the list of renderers
                renderers.push({
                    target: target,
                    prop: isHyphenated ? propHyphenated : prop,
                    render: renderFn,
                    mix: mix,
                    values: values
                })
            }

            return renderers
        })

        return (offset: number): void => {
            const easedOffset = easing(offset)

            for (let i = 0, ilen = renderers.length; i < ilen; i++) {
                const r = renderers[i]
                const values = r.values
                const total = values.length - 1
                const totalOffset = total * easedOffset
                let stepStart = max(Math.floor(totalOffset), 0)
                const stepEnd = min(stepStart + 1, total)

                if (total === stepStart) {
                    // if on last step, use 2nd to last in order to over-seek
                    stepStart--
                }

                // prettier-ignore
                r.render(
                    r.target,
                    r.prop,
                    r.mix(values[stepStart], values[stepEnd], totalOffset - stepStart)
                )
            }
        }
    }
}
function getAttribute(target: HTMLElement, prop: string) {
    target.getAttribute(name)
}
function getProperty(target: {}, name: string) {
    return target[name]
}
function getVariable(target: HTMLElement, name: string) {
    target.style.getPropertyValue(name)
}
function getStyle(target: HTMLElement, prop: string) {
    return target.style[prop]
}
function renderAttribute(target: HTMLElement, name: string, value: string) {
    target.setAttribute(name, value)
}
function renderProperty(target: {}, name: string, value: string) {
    target[name] = value
}
function renderVariable(target: HTMLElement, name: string, value: string) {
    target.style.setProperty(name, value ? value + '' : '')
}
function renderStyle(target: HTMLElement, name: string, value: string) {
    target.style[name] = value
}
function parseNumber(value: any): number {
    return +value
}

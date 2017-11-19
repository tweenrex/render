import { IRendererOptions, IRenderFunctionOptions, IRenderFunction, IRenderValueOptions, OneOrMany } from './types'
import { max, min, floor } from './internal/math'
import { isArray } from './internal/arrays'
import { isDefined } from './internal/inspect'

const optionNames = ['targets', 'secondary', 'easing']

export function renderer<T>(ro: IRendererOptions) {
    return (opts: IRenderFunctionOptions<T>) => {
        // resolve targets
        const targets = ro.getTargets(opts.targets)

        // get renderers for each target and property
        const renderers: IRenderFunction[] = []
        for (let t = 0, tlen = targets.length; t < tlen; t++) {
            const target = targets[t]
            for (let prop in opts) {
                 // skip builtin option names
                if (optionNames.indexOf(prop) === -1) {
                    // get target adapter for getting and setting values
                    const targetAdapter = ro.getAdapter(target, prop)

                    // get first value if this is a transition
                    const value = opts[prop]
                    // prettier-ignore
                    const valueConfig = isDefined((value as IRenderValueOptions).value)
                        ? value as IRenderValueOptions
                        : { value: value as OneOrMany<string | number> }

                    if (!isArray(valueConfig.value)) {
                        valueConfig.value = [targetAdapter.get(target, prop), valueConfig.value]
                    }

                    // parse values
                    const ilen = valueConfig.value.length
                    const values = Array(ilen)
                    for (let i = 0; i < ilen; i++) {
                        const r = valueConfig.value[i]
                        const parsed = ro.parse(r, valueConfig.type)
                        values[i] = parsed.value
                        if (!valueConfig.mix) {
                            valueConfig.mix = parsed.mix
                        }
                        if (!valueConfig.format) {
                            valueConfig.format = parsed.format
                        }
                    }

                    // create render function for this value
                    const renderFn = (offset: number) => {
                        const total = values.length - 1
                        const totalOffset = total * offset
                        let stepStart = max(floor(totalOffset), 0)
                        let stepEnd = min(stepStart + 1, total)

                        if (total === stepStart) {
                            // if on last step, use 2nd to last in order to over-seek
                            stepStart--
                        }
                        if (!stepEnd) {
                            stepEnd++
                        }

                        let nextValue = valueConfig.mix(values[stepStart], values[stepEnd], totalOffset - stepStart)
                        if (valueConfig.format) {
                            nextValue = valueConfig.format(nextValue)
                        }
                        targetAdapter.set(target, prop, nextValue)
                    }

                    // add to the list of renderers
                    renderers.push((offset: number) => {
                        if (valueConfig.easing) {
                            // handle value-level easing
                            offset = valueConfig.easing(offset)
                        }
                        if (valueConfig.secondary) {
                            // value has a secondary action, pass the render function and offset
                            // to it instead
                            valueConfig.secondary(offset, renderFn)
                        } else {
                            // just render the function
                            renderFn(offset)
                        }
                    })
                }
            }
        }

        // return aggregate render function
        const rLen = renderers.length
        const render = (o: number) => {
            for (let i = 0; i < rLen; i++) {
                renderers[i](o)
            }
        }

        return (offset: number): void => {
            if (opts.easing) {
                // handle interpolate-level easing
                offset = opts.easing(offset)
            }
            if (opts.secondary) {
                // pass render function and current offset to secondary action function
                // secondary can delay the action outside the scope of this observable or
                // be used to perform secondary animations
                opts.secondary(offset, render)
            } else {
                // call the render function
                render(offset)
            }
        }
    }
}

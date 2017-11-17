import { isDOM } from '../internal/inspect'
import { cssVarExp } from '../internal/constants'

const attrs = {
    get(target: HTMLElement, prop: string) {
        target.getAttribute(name)
    },
    set(target: HTMLElement, name: string, value: string) {
        target.setAttribute(name, value)
    }
}

const props = {
    get(target: {}, name: string) {
        return target[name]
    },
    set(target: {}, name: string, value: string) {
        target[name] = value
    }
}

const vars = {
    get(target: HTMLElement, name: string) {
        target.style.getPropertyValue(name)
    },
    set(target: HTMLElement, name: string, value: string) {
        target.style.setProperty(name, value ? value + '' : '')
    }
}

const styles = {
    get(target: HTMLElement, prop: string) {
        return target.style[prop]
    },
    set(target: HTMLElement, name: string, value: string) {
        target.style[name] = value
    }
}

export function getTargetAdapter(target: any, prop: string) {
    if (!isDOM(target)) {
        // non-dom targets just use object properties
        return props
    }

    // assert type for auto-complete
    const el = target as HTMLElement
    if (cssVarExp.test(prop)) {
        // props that start with -- are css variables
        return vars
    }
    if (typeof el.style[prop] !== 'undefined') {
        // if style has the prop, use the style
        return styles
    }
    if (el.hasAttribute(prop)) {
        // if attribute is present, use attribute
        return attrs
    }
    // otherwise use property (innerHTML, etc.)
    return props
}

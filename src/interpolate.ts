import {
    IRenderer, OneOrMany, IInterpolateTarget, IInterpolateOptions,
    IRenderPropertyOptions, IMixer, IRenderPropertyFormatter,
    IRenderFunctionOptions, IAnimationEffect, ITargetAdapter
} from './types'
import { renderer } from './renderer'
import { resolveDomTargets } from './utilities/resolveDomTargets'
import { isDOM, isNumeric, isString, isDefined } from './utilities/inspect'
import { cssVarExp } from './utilities/constants'
import { numberToString } from './converters/numberToString'
import { stringToTerms } from './converters/stringToTerms'
import { hexToRgb } from './converters/hexToRgb'
import { termsToString } from './converters/termsToString'
import { propertyAdapter } from './adapters/propertyAdapter'
import { attributeAdapter } from './adapters/attributeAdapter'
import { cssVariableAdapter } from './adapters/cssVariableAdapter'
import { styleAdapter } from './adapters/styleAdapter'
import { mixNumber } from './mixers/mixNumber'
import { mixTerms } from './mixers/mixTerms'
import { mixDiscrete } from './mixers/mixDiscrete'
import { isArray } from './utilities/arrays';

const TERMS = 'terms'
const NUMBER = 'number'

export const interpolate: IRenderer<IInterpolateTarget, IInterpolateOptions> = renderer({
    getEffects(target: any, props: string[], opts: IRenderFunctionOptions<any>): IAnimationEffect[] {
        const effects: IAnimationEffect[] = []
        for (let i = 0; i < props.length; i++) {
            const prop = props[i]
            const value = opts[prop]
            let valueAsConfig = value as IRenderPropertyOptions<any>

            let effect: IAnimationEffect = {
                target: target,
                prop: prop,
                value: []
            }

            let value2: OneOrMany<any>
            let type: string
            if (isDefined(valueAsConfig.value)) {
                // wrap value in options
                effect.easing = valueAsConfig.easing
                effect.format = valueAsConfig.format
                effect.mix = valueAsConfig.mix
                type = valueAsConfig.type

                value2 = valueAsConfig.value
            } else {
                value2 = value as any
            }

            // get setter/getter
            const targetAdapter = getAdapter(target, prop)
            effect.set = effect.set || targetAdapter.set

            if (!isArray(value2)) {
                // if not an array, detect starting property
                effect.value = [targetAdapter.get(target, prop), value2]
            } else {
                effect.value = value2
            }

            const ilen = effect.value.length
            const values = Array(ilen)
            for (let j = 0; j < ilen; j++) {
                const r = effect.value[j]
                const parsed = parse(r, type)
                values[j] = parsed.value
                if (!effect.mix) {
                    effect.mix = parsed.mix
                }
                if (!effect.format) {
                    effect.format = parsed.format
                }
            }
            effect.value = values

            effects.push(effect)
        }
        return effects
    },
    getTargets(targets: OneOrMany<IInterpolateTarget>): {}[] {
        const results = []
        resolveDomTargets(targets, results)
        return results
    }
})


function parse(value: any, type?: string): IRendererParseResult {
    if (!type) {
        if (isNumeric(value)) {
            type = NUMBER
        } else if (isString(value) && /\d*/.test(value)) {
            type = TERMS
        }
    }

    if (type === NUMBER) {
        return {
            value: +value,
            mix: mixNumber,
            format: numberToString
        }
    }
    if (type === TERMS) {
        return {
            value: stringToTerms(hexToRgb(value)),
            mix: mixTerms,
            format: termsToString
        }
    }
    return {
        value,
        mix: mixDiscrete
    }
}

function getAdapter(target: any, prop: string): ITargetAdapter {
    if (!isDOM(target)) {
        // non-dom targets just use object properties
        return propertyAdapter
    }

    // assert type for auto-complete
    const el = target as HTMLElement
    if (cssVarExp.test(prop)) {
        // props that start with -- are css variables
        return cssVariableAdapter
    }
    if (typeof el.style[prop] !== 'undefined') {
        // if style has the prop, use the style
        return styleAdapter
    }
    if (el.hasAttribute(prop)) {
        // if attribute is present, use attribute
        return attributeAdapter
    }
    // otherwise use property (innerHTML, etc.)
    return propertyAdapter
}

export interface IRendererParseResult {
    value: any
    mix: IMixer
    format?: IRenderPropertyFormatter
}

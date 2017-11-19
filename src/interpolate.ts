import { IRenderer, OneOrMany, ITargetAdapter, IInterpolateTarget, IInterpolateOptions } from './types';
import { renderer } from './renderer';
import { resolveDomTargets } from './internal/resolveDomTargets';
import { cssVarExp } from './internal/constants'
import { isDOM, isNumeric, isString } from './internal/inspect'
import { numberToString } from './converters/numberToString';
import { stringToTerms } from './converters/stringToTerms';
import { hexToRgb } from './converters/hexToRgb';
import { termsToString } from './converters/termsToString';
import { propertyAdapter } from './adapters/propertyAdapter';
import { attributeAdapter } from './adapters/attributeAdapter';
import { cssVariableAdapter } from './adapters/cssVariableAdapter';
import { styleAdapter } from './adapters/styleAdapter';
import { mixNumber } from './mixers/mixNumber';
import { mixTerms } from './mixers/mixTerms';
import { mixDiscrete } from './mixers/mixDiscrete';

const TERMS = 'terms'
const NUMBER = 'number'

export const interpolate: IRenderer<IInterpolateTarget, IInterpolateOptions> = renderer({
    parse(value: any, type?: string) {
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
    },
    getAdapter(target: any, prop: string): ITargetAdapter {
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
    },
    getTargets(targets: OneOrMany<IInterpolateTarget>): {}[] {
        const results = []
        resolveDomTargets(targets, results)
        return results
    }
});

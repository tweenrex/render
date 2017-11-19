import { min, round, sqrt, clamp } from '../internal/math';
import { isNumber } from '../internal/inspect';
import { mixNumber } from './mixNumber';
import { mixDiscrete } from './mixDiscrete';
import { sq255 } from '../internal/constants';

export function mixTerms(aTerms, bTerms, o) {
    const ilen = min(aTerms.length, bTerms.length)
    const result = Array(ilen)

    let rgbLocked = 0
    for (let i = 0; i < ilen; i++) {
        const a = aTerms[i]
        const b = bTerms[i]
        const numeric = isNumber(a)

        let value
        if (numeric) {
            if (rgbLocked) {
                // account for RGB color channel oddity
                value = round(sqrt(clamp(mixNumber(a * a, b * b, o), 0, sq255)))
                rgbLocked--
            } else {
                value = mixNumber(a, b, o)
            }
        } else {
            value = mixDiscrete(a, b, o)
        }

        if (a === 'rgb' || a === 'rgba') {
            rgbLocked = 3
        }
        result[i] = value
    }
    return result
}

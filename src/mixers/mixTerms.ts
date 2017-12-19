import { min, round, sqrt, clamp } from '../utilities/math'
import { isNumber } from '../utilities/inspect'
import { sq255 } from '../utilities/constants'
import { mixNumber } from './mixNumber'
import { mixDiscrete } from './mixDiscrete'

export function mixTerms(aTerms: any[], bTerms: any[], o: number) {
    const ilen = min(aTerms.length, bTerms.length)
    if (isNaN(ilen)) {
        console.log(aTerms, bTerms)
    }
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

import { isNumber } from '../internal/inspect';


export function termsToString(aTerms) {
    const NUM = 1
    const PUNCT = 2
    const WORD = 3

    let result = ''
    let lastType
    for (let i = 0; i < aTerms.length; i++) {
        const term = aTerms[i]
        const type = isNumber(term) ? NUM : /^[\(\),]$/i.test(term) ? PUNCT : WORD
        if (lastType && lastType === type && type !== PUNCT) {
            result += ' '
        }
        result += term
        lastType = type
    }
    return result
}

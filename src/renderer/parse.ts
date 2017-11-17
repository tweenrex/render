import { isNumber, isNumeric, isString } from "../internal/inspect";
import { minMax, sqrt, round } from "../internal/math";
import { sq255 } from "../internal/constants";


export function parse(value: any, type?: string) {
    if (!type) {
        if (isNumeric(value)) {
            type = 'number'
        } else if (isString(value) && /\d*/.test(value)) {
            type = 'terms'
        }
    }

    switch (type) {
        case 'number':
            return parseNumber(value)
        case 'terms':
            value = convertHexToRGB(value)
            return parseTerms(value)
        default:
            return parseDiscrete(value)
    }
}

function parseNumber(value) {
    return {
        value: +value,
        mix: mixNumber,
        format: formatNumber
    }
}

function parseTerms(value) {
    var exp = /\s*([a-z]+\-?[a-z]*|%|\-?\d*\.?\d+\s*|,+?|\(|\))\s*/gi
    var terms = value
        .replace(exp, ' $1')
        .trim()
        .split(' ')
        .map(v => (isNumeric(v) ? parseFloat(v) : v.trim()))
        .filter(v => v !== '')

    return {
        value: terms,
        mix: mixTerms,
        format: formatTerms
    }
}

function parseDiscrete(value) {
    return {
        value,
        mix: mixDiscrete,
        format: undefined
    }
}

function convertHexToRGB(stringValue: string) {
    const hexRegex = /#(([a-f0-9]{6})|([a-f0-9]{3}))$/i
    const match = stringValue.match(hexRegex)
    if (!match) {
        return stringValue
    }

    const hex = match[1]
    const hexColor = parseInt(hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex, 16)
    const r = (hexColor >> 16) & 0xff
    const g = (hexColor >> 8) & 0xff
    const b = hexColor & 0xff

    return `rgb(${r},${g},${b})`
}

function formatTerms(aTerms) {
    const num = 1
    const punct = 2
    const word = 3

    let result = ''
    let lastType
    for (let i = 0; i < aTerms.length; i++) {
        const term = aTerms[i]
        const type = isNumber(term) ? num : /^[\(\),]$/i.test(term) ? punct : word
        if (lastType && lastType === type && type !== punct) {
            result += ' '
        }
        result += term
        lastType = type
    }
    return result
}
function formatNumber(a) {
    return a.toString()
}

function mixNumber(a, b, o) {
    return a + (b - a) * o
}

function mixDiscrete(a, b, o) {
    return o < 0.5 ? a : b
}
function mixTerms(aTerms, bTerms, o) {
    const ilen = Math.min(aTerms.length, bTerms.length)
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
                value = round(sqrt(minMax(mixNumber(a * a, b * b, o), 0, sq255)))
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

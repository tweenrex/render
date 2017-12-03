import { isNumeric } from '../utilities/inspect';

export function stringToTerms(value) {
    return value
        .replace(/\s*([a-z]+\-?[a-z]*|%|\-?\d*\.?\d+\s*|,+?|\(|\))\s*/gi, ' $1')
        .trim()
        .split(' ')
        .map(v => (isNumeric(v) ? parseFloat(v) : v.trim()))
        .filter(v => v !== '')
}

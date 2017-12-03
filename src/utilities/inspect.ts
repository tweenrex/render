import { _ } from './constants';
const w = window as Window & { SVGElement }
export function isDOM(target: any) {
    return target instanceof Element
}
export function isSVG(target: any) {
    return w.SVGElement && target instanceof w.SVGElement
}
export function isNumber(obj: any) {
    return typeof obj === 'number'
}
export function isFunction(obj: any) {
    return typeof obj === 'function'
}
export function isString(obj: any) {
    return typeof obj === 'string'
}
export function isNumeric(obj: any) {
    return isNumber(obj) || /^\-?\d*\.?\d+$/.test(obj)
}
export function isDefined(obj: any) {
    return obj !== _
}

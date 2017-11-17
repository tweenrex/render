import { _ } from "./constants";

export function isDOM(target: any) {
    return target instanceof Element
}
export function isNumber(obj: any) {
    return typeof obj === 'number'
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

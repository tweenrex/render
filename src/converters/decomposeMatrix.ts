import { degrees, sqrt, atan2, atan } from '../utilities/math'
import { ICSSTransform } from '../types';


let matrix: any;

export function decomposeMatrix(value: string): ICSSTransform {
    if (!matrix) {
        // setup for matrix
        const w = window as any
        matrix = w.WebKitCSSMatrix || w.MSCSSMatrix || w.DOMMatrix
    }
    // parse matrix
    let { a, b, c, d, e, f } = new matrix(value)

    // determine x scale
    let scaleX = sqrt(a * a + b * b)
    if (scaleX) {
        a /= scaleX
        b /= scaleX
    }

    // determine x skew
    let skewX = a * c + b * d
    if (skewX) {
        c -= a * skewX
        d -= b * skewX
    }

    // determine y scale
    const scaleY =  sqrt(c * c + d * d)
    if (scaleY) {
        c /= scaleY
        d /= scaleY
        skewX /= scaleY
    }

    // flip if should be inverted
    if (a * d < b * c) {
        a = -a
        b = -b
        skewX = -skewX
        scaleX = -scaleX
    }

    // return
    return {
        rotate: atan2(b, a) * degrees,
        scaleX: scaleX,
        scaleY: scaleY,
        skewX: atan(skewX) * degrees,
        x: e,
        y: f
    }
}

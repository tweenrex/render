import { createFloatArray } from '../utilities/createFloatArray';
import { FloatArray } from '../types';

// setup for matrix
const window2 = window as any
const matrix = window2.WebKitCSSMatrix || window2.MSCSSMatrix || window2.DOMMatrix

export function transformToMatrix(value: string): FloatArray {
    //// uncomment if we need fallback support for no Matrix
    // if (!matrix) {
    //     return computeStyle(value)
    // }

    // use DOMMatrix to convert to array
    const m = new matrix(value)

    const r = createFloatArray(16)
    r[0] = m.m11
    r[1] = m.m12
    r[2] = m.m13
    r[3] = m.m14

    r[4] = m.m21
    r[5] = m.m22
    r[6] = m.m23
    r[7] = m.m24

    r[8] = m.m31
    r[9] = m.m32
    r[10] = m.m33
    r[11] = m.m34

    r[12] = m.m41
    r[13] = m.m42
    r[14] = m.m43
    r[15] = m.m44

    // return matrix array
    return r
}

//// uncomment if we need fallback support for no Matrix
// let el: HTMLElement
// function computeStyle(value: string) {
//     if (!el) {
//         // first time setup for converting matrices
//         el = document.createElement('div')
//         el.setAttribute('style', 'width:0;height:0;overflow:hidden')
//         document.body.appendChild(el)
//     }

//     // set to element and get matrix from getComputedStyle
//     el.style.transform = value
//     const transform = getComputedStyle(el).transform

//     // execute regex until it finds all numbers
//     const exp = /(\-?\d*\.*\d+)/g
//     const r = createFloatArray(16)
//     let pos = -1
//     let m: RegExpExecArray
//     do {
//         m = exp.exec(transform)
//         r[++pos] = +m[1]
//     } while (m)

//     // convert to matrix3d if original was matrix
//     if (pos === 5) {
//         // shift d, e, f -> m21, m22, m23
//         r[4] = r[3]
//         r[5] = r[4]
//         r[6] = r[5]

//         // fill 0 positions
//         r[3] = r[7] = r[8] = r[9] = r[11] = r[12] = r[13] = 0

//         // fill 1 position
//         r[10] = r[15] = 1
//     }

//     // return matrix array
//     return r
// }

import { FloatArray } from '../types';

const math = Math
export const min = math.min
export const max = math.max
export const round = math.round
export const sqrt = math.sqrt
export const floor = math.floor

export function clamp(val, lower, upper) {
    return max(lower, min(upper, val))
}

export function multiplyMatrices(a: FloatArray, b: FloatArray, r: FloatArray): void {
    // assign all variables to local for minification
    const a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11],
        a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15],
        b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15]

    // multiply atrix
    r[0] = b0 * a0 + b4 * a4 + b8 * a8 + b12 * a12
    r[1] = b0 * a1 + b4 * a5 + b8 * a9 + b12 * a13
    r[2] = b0 * a2 + b4 * a6 + b8 * a10 + b12 * a14
    r[3] = b0 * a3 + b4 * a7 + b8 * a11 + b12 * a15
    r[4] = b1 * a0 + b5 * a4 + b9 * a8 + b13 * a12
    r[5] = b1 * a1 + b5 * a5 + b9 * a9 + b13 * a13
    r[6] = b1 * a2 + b5 * a6 + b9 * a10 + b13 * a14
    r[7] = b1 * a3 + b5 * a7 + b9 * a11 + b13 * a15
    r[8] = b2 * a0 + b6 * a4 + b10 * a8 + b14 * a12
    r[9] = b2 * a1 + b6 * a5 + b10 * a9 + b14 * a13
    r[10] = b2 * a2 + b6 * a6 + b10 * a10 + b14 * a14
    r[11] = b2 * a3 + b6 * a7 + b10 * a11 + b14 * a15
    r[12] = b3 * a0 + b7 * a4 + b11 * a8 + b15 * a12
    r[13] = b3 * a1 + b7 * a5 + b11 * a9 + b15 * a13
    r[14] = b3 * a2 + b7 * a6 + b11 * a10 + b15 * a14
    r[15] = b3 * a3 + b7 * a7 + b11 * a11 + b15 * a15
}

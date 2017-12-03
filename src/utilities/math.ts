const floatExp = /^(\-?\d+\.?\d{0,5})/
const math = Math
export const min = math.min
export const atan = math.atan
export const atan2 = math.atan2
export const max = math.max
export const round = math.round
export const sqrt = math.sqrt
export const floor = math.floor
export const degrees = 180 / math.PI

export function clamp<T extends number | string>(val: T, bottom: T, top: T) {
    return val < bottom ? bottom : val > top ? top : val
}

/**
 * Returns a number formatted to a max number of 5 decimal places
 */
export function roundFloat(n: number | string) {
    return floatExp.exec(n.toString())![1]
}

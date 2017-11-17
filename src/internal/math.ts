const math = Math
export const min = math.min
export const max = math.max
export const round = math.round
export const sqrt = math.sqrt

export function minMax(val, lower, upper) {
    return max(lower, min(upper, val))
}

const math = Math
export const min = math.min
export const max = math.max
export const round = math.round
export const sqrt = math.sqrt
export const floor = math.floor

export function clamp(val, lower, upper) {
    return max(lower, min(upper, val))
}

export const isArray = Array.isArray

export function pushAll<T>(a: T[], b: T[]) {
    a.push.apply(a, b)
}

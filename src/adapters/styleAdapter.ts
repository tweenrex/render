import { ITargetAdapter } from '../types'

export const styleAdapter: ITargetAdapter = {
    get(target: HTMLElement, prop: string) {
        return getComputedStyle(target)[prop]
    },
    set(target: HTMLElement, name: string, value: string) {
        target.style[name] = value
    }
}

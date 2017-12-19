import { ITargetAdapter } from '../types'

export const cssVariableAdapter: ITargetAdapter = {
    get(target: HTMLElement, name: string) {
        target.style.getPropertyValue(name)
    },
    set(target: HTMLElement, name: string, value: string) {
        target.style.setProperty(name, value ? value + '' : '')
    }
}

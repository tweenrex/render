import { ITargetAdapter } from '../types';

export const attributeAdapter: ITargetAdapter = {
    get(target: HTMLElement, prop: string) {
        target.getAttribute(name)
    },
    set(target: HTMLElement, name: string, value: string) {
        target.setAttribute(name, value)
    }
}

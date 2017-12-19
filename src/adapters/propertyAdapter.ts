import { ITargetAdapter } from '../types'

export const propertyAdapter: ITargetAdapter = {
    get(target: {}, name: string) {
        return target[name]
    },
    set(target: {}, name: string, value: string) {
        target[name] = value
    }
}

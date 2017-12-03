import { scheduler } from './scheduler'
import { isFunction } from './inspect'

export function observe(obj, onUpdate) {
    onUpdate = scheduler(onUpdate)

    for (const name in obj) {
        if (obj.hasOwnProperty(name) && !isFunction(obj[name])) {
            let _val = obj[name]
            Object.defineProperty(obj, name, {
                get() {
                    return _val
                },
                set(val) {
                    if (_val !== val) {
                        _val = val
                        onUpdate()
                    }
                }
            })
        }
    }
}

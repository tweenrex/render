import { IRenderValue, IRenderPropertyOptions, IRendererOptions } from '../types'
import { isDefined } from '../utilities/inspect'
import { isArray } from '../utilities/arrays'
import { IRenderPropertyKeyframes } from '../index';

export function valueToValueConfig<T>(
    target: {},
    prop: string,
    value: IRenderValue<T>,
    ro: IRendererOptions
) {
    let valueAsConfig = (value as IRenderPropertyOptions<T>)
    let options: IRenderPropertyKeyframes<T>;
    if (!isDefined(valueAsConfig.value)) {
        // wrap value in options
        options = { value: value as any }
    } else {
        options = valueAsConfig
    }


    const targetAdapter = ro.getAdapter(target, prop)
    options.get = options.get || targetAdapter.get
    options.set = options.set || targetAdapter.set

    if (!isArray(options.value)) {
        // if not an array, detect starting property
        options.value = [ options.get(target, prop), options.value ]
    }

    const ilen = options.value.length
    const values = Array(ilen)
    for (let i = 0; i < ilen; i++) {
        const r = options.value[i]
        const parsed = ro.parse(r, options.type)
        values[i] = parsed.value
        if (!options.mix) {
            options.mix = parsed.mix
        }
        if (!options.format) {
            options.format = parsed.format
        }
    }
    options.value = values

    return options
}

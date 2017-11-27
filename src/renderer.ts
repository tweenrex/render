import { IRendererOptions, IRenderFunctionOptions, IRenderFunction } from './types'
import { max, min, floor } from './utilities/math'
import { builtInRenderOptions } from './utilities/constants'
import { valueToValueConfig } from './converters/valueToValueConfig'
import { IEasing, IEasingAsync } from './index'

export function renderer<T>(ro: IRendererOptions) {
    return (opts: IRenderFunctionOptions<T>) => {
        // resolve targets
        const targets = ro.getTargets(opts.targets) as T[]

        // get renderers for each target and property
        const renderers: IRenderFunction[] = []
        for (let t = 0, tlen = targets.length; t < tlen; t++) {
            const target = targets[t]
            for (let prop in opts) {
                // skip builtin option names
                if (builtInRenderOptions.indexOf(prop) === -1) {
                    // get target adapter for getting and setting values
                    const valueConfig = valueToValueConfig(target, prop, opts[prop], ro)

                    // create render function for this value
                    const renderFn = (offset: number, target2?: any) => {
                        const total = valueConfig.value.length - 1
                        const totalOffset = total * offset
                        let stepStart = max(floor(totalOffset), 0)
                        let stepEnd = min(stepStart + 1, total)

                        if (total === stepStart) {
                            // if on last step, use 2nd to last in order to over-seek
                            stepStart--
                        }
                        if (!stepEnd) {
                            stepEnd++
                        }

                        let nextValue = valueConfig.mix(
                            valueConfig.value[stepStart],
                            valueConfig.value[stepEnd],
                            totalOffset - stepStart
                        )
                        if (valueConfig.format) {
                            nextValue = valueConfig.format(nextValue)
                        }
                        valueConfig.set(target2 || target, prop, nextValue)
                    }

                    // add to the list of renderers
                    const easedRenderFn = (offset: number, target2?: any) => {
                        const easing = valueConfig.easing
                        if (!easing) {
                            // just render the function
                            renderFn(offset, target2 || target)
                        } else if ((easing as IEasingAsync).tr_type === 'ASYNC') {
                            // value has a secondary action, pass the render function and offset
                            (easing as IEasingAsync)(offset, renderFn)
                        } else {
                            // handle value-level easing
                            renderFn((easing as IEasing)(offset), target2 || target)
                        }
                    }

                    if (opts.debug) {
                        // hook for debugger to sample target against function
                        opts.debug(target, easedRenderFn)
                    }

                    renderers.push(easedRenderFn)
                }
            }
        }

        // return aggregate render function
        const rLen = renderers.length
        const render = (o: number) => {
            for (let i = 0; i < rLen; i++) {
                renderers[i](o)
            }
        }

        return (offset: number): void => {
            const easing = opts.easing
            if (!easing) {
                // just render the function
                render(offset)
            } else if ((easing as IEasingAsync).tr_type === 'ASYNC') {
                // value has a secondary action, pass the render function and offset
                (easing as IEasingAsync)(offset, render)
            } else {
                // handle value-level easing
                render((easing as IEasing)(offset))
            }
        }
    }
}

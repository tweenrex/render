import { IRendererOptions, IRenderFunctionOptions, IEasing, IEasingAsync } from './types'
import { max, min, floor } from './utilities/math'
import { builtInRenderOptions } from './utilities/constants'
import { IAnimationEffect } from './index'
import { pushAll } from './utilities/arrays'

export function renderer<T>(ro: IRendererOptions) {
    return (opts: IRenderFunctionOptions<T>) => {
        // resolve targets
        const targets = ro.getTargets(opts.targets) as T[]
        const props = Object.keys(opts).filter(isCustomProp)

        // normalize values and detect configuration
        const configs: IAnimationEffect[] = []
        for (let t = 0, tlen = targets.length; t < tlen; t++) {
            pushAll(configs, ro.getEffects(targets[t], props, opts))
        }

        // get renderers for each target and property
        const renderers = configs.map(getRenderItem)

        // hook for debugger to sample target against function
        if (opts.debug) {
            renderers.forEach(r => opts.debug(r.target, r.render))
        }

        // return aggregate render function
        return getEasedFunction(opts, (o: number) => {
            for (let i = 0; i < renderers.length; i++) {
                const item = renderers[i]
                item.render(o, item.target)
            }
        })
    }
}

function getRenderItem(config: IAnimationEffect) {
    // create render function for this value
    const renderFn = getEasedFunction(config, (offset: number, target2?: any) => {
        const total = config.value.length - 1
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

        let nextValue = config.mix(config.value[stepStart], config.value[stepEnd], totalOffset - stepStart)
        if (config.format) {
            nextValue = config.format(nextValue)
        }
        config.set(target2, config.prop, nextValue)
    })
    return {
        render: renderFn,
        target: config.target
    }
}

function getEasedFunction(
    options: { easing?: IEasing | IEasingAsync },
    fn: (offset: number, target2?: any) => void
) {
    return (offset: number, target2?: any) => {
        const easing = options.easing as any
        if (!easing) {
            // just render the function
            fn(offset, target2)
        } else if (easing.tr_type === 'ASYNC') {
            // value has a secondary action, pass the render function and offset
            easing(offset, target2, fn)
        } else {
            // handle value-level easing
            fn((easing as IEasing)(offset), target2)
        }
    }
}

function isCustomProp(prop: string) {
    return builtInRenderOptions.indexOf(prop) === -1
}

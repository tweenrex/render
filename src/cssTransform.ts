import { IRenderer, OneOrMany, ITargetAdapter, ICSSTransformTarget, ICSSTransformOptions, ICSSTransformOptionsInner, ITransformFn } from './types'
import { builtInRenderOptions } from './utilities/constants';
import { resolveDomTargets } from './utilities/resolveDomTargets'
import { styleAdapter } from './adapters/styleAdapter'
import { mixDiscrete } from './mixers/mixDiscrete'
import { renderer } from './renderer'
import { IRenderFunction } from './index';

const renderOptions = {
    parse(value: any, type?: string) {
        return {
            value,
            mix: mixDiscrete
        }
    },
    getAdapter(target: any, prop: string): ITargetAdapter {
        return styleAdapter
    },
    getTargets(targets: OneOrMany<ICSSTransformTarget>): {}[] {
        const results = []
        resolveDomTargets(targets, results)
        return results
    }
}
const cssTransformInner: IRenderer<ICSSTransformTarget, ICSSTransformOptionsInner> = renderer(renderOptions)

export function cssTransform(opts: ICSSTransformOptions): IRenderFunction {
    // restructure outward API so it can be set on one property
    const transformList: ITransformFn[] = []
    for (let prop in opts) {
        // skip builtin properties
        if (builtInRenderOptions.indexOf(prop) === -1) {
            const opt = opts[prop]
            transformList.push({
                easing: opt.easing,
                type: prop,
                value: opt.value
            })
        }
    }

    // pass to the read renderer
    return cssTransformInner({
        easing: opts.easing,
        targets: opts.targets,
        transform: transformList
    })
}

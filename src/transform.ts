import {
    IRenderer,
    OneOrMany,
    ICSSTransformTarget,
    ICSSTransformOptions,
    IRenderFunctionOptions,
    IAnimationEffect,
    IRenderPropertyOptions
} from './types'
import { resolveDomTargets } from './utilities/resolveDomTargets'
import { renderer } from './renderer'
import { isDefined, isSVG } from './utilities/inspect'
import { styleAdapter } from './adapters/styleAdapter'
import { isArray } from './utilities/arrays'
import { decomposeMatrix } from './converters/decomposeMatrix'
import { observe } from './utilities/observe'
import { round, roundFloat } from './utilities/math'
import { attributeAdapter } from './adapters/attributeAdapter'
import { propertyAdapter } from './adapters/propertyAdapter'
import { mixNumber } from './mixers/mixNumber'

const passthru = <T>(t: T) => t

export const transform: IRenderer<ICSSTransformTarget, ICSSTransformOptions> = renderer({
    getEffects(target: HTMLElement, props: string[], opts: IRenderFunctionOptions<any>): IAnimationEffect[] {
        const adapter = propertyAdapter
        const effects: IAnimationEffect[] = []
        for (let i = 0; i < props.length; i++) {
            const prop = props[i]
            const value = opts[prop]
            const valueAsConfig = value as IRenderPropertyOptions<any>
            const hasOptions = isDefined(valueAsConfig.value)
            const value2 = hasOptions ? valueAsConfig.value : (value as any)

            effects.push({
                target: target,
                prop: prop,
                mix: mixNumber,
                format: passthru,
                set: adapter.set,
                value: isArray(value2) ? value : [adapter.get(target, prop), value2],
                easing: (hasOptions && valueAsConfig.easing) || passthru
            })
        }
        return effects
    },
    getTargets(targets: OneOrMany<ICSSTransformTarget>): {}[] {
        const results = []
        resolveDomTargets(targets, results)
        return results.map(getTransformProxy)
    }
})

function getTransformProxy(el: HTMLElement) {
    const isTargetSVG = isSVG(el)
    const adapter = isTargetSVG ? attributeAdapter : styleAdapter
    const initial = adapter.get(el, 'transform')
    const target = decomposeMatrix(initial)

    // setup proxy property for scale
    Object.defineProperty(target, 'scale', {
        get() {
            return target.scaleX
        },
        set(val) {
            target.scaleX = target.scaleY = val
        }
    })

    let lUnit = ''
    let rUnit = ''
    if (!isTargetSVG) {
        lUnit = 'px'
        rUnit = 'deg'
    }

    let lastTransform
    observe(target, () => {
        let val = ''
        if (target.x || target.y) {
            val += `translate(${round(target.x)}${lUnit},${round(target.y)}${lUnit}) `
        }
        if (target.rotate) {
            val += `rotate(${roundFloat(target.rotate)}${rUnit}) `
        }
        if (target.skewX) {
            val += `skewX(${roundFloat(target.skewX)}${rUnit}) `
        }
        if (target.scaleX !== 1 || target.scaleY !== 1) {
            val += `scale(${roundFloat(target.scaleX)},${roundFloat(target.scaleY)}) `
        }

        // trim or add empty transform
        val = !val ? `translate(0${lUnit})` : val.trim()

        if (lastTransform !== val) {
            el.style.transform = lastTransform = val
        }
    })

    return target
}

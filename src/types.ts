export type ICSSTransformTarget = OneOrMany<Element | string>

export interface ICSSTransformOptions extends IRenderFunctionOptions<ICSSTransformTarget> {
    rotate?: IRenderValue<number>
    scaleX?: IRenderValue<number>
    scaleY?: IRenderValue<number>
    scale?: IRenderValue<number>
    skewX?: IRenderValue<number>
    x?: IRenderValue<number>
    y?: IRenderValue<number>
}

export interface ICSSTransform {
    rotate: number
    scaleX: number
    scaleY: number
    skewX: number
    x: number
    y: number
}

export interface IEasing {
    (offset: number): number
}

export interface IEasingAsync {
    (n: number, target: any, fn: IRenderFunction): void
    tr_type?: 'ASYNC'
}

export type IInterpolateTarget = {} | string

export interface IInterpolateOptions extends IRenderFunctionOptions<IInterpolateTarget> {
    // some complexity in types is required to provide good type completion
    [propName: string]: IRenderValue<string | number> | IEasing | IEasingAsync | OneOrMany<IInterpolateTarget>
}

export interface IMixer {
    (a: any, b: any, offset: number): any
}

export interface IRenderFunction {
    (offset: number, target?: any): void
}

export interface IRenderer<TTarget, TFunctionOptions extends IRenderFunctionOptions<TTarget>> {
    (opts: TFunctionOptions): IRenderFunction
}

export interface IRenderFunctionOptions<T> {
    targets: OneOrMany<T>
    easing?: IEasing | IEasingAsync
    debug?: (target: T, fn: IRenderFunction) => void
}

export interface IRendererOptions {
    getEffects(target: any, props: string[], options: IRenderFunctionOptions<any>): IAnimationEffect[]
    getTargets(targets: OneOrMany<{} | string>): {}[]
}

export interface IRenderPropertyFormatter {
    (n: any): any
}

export interface IRenderPropertyBase {
    easing?: IEasing | IEasingAsync
    type?: string
    format?: IRenderPropertyFormatter
    mix?: IMixer
}

export interface IAnimationEffect {
    target: any
    prop: string
    value: any[]
    easing?: IEasing | IEasingAsync
    format?: IRenderPropertyFormatter
    mix?: IMixer
    set?: ITargetSetter
}

export interface ITargetAdapter {
    get?: ITargetGetter
    set?: ITargetSetter
}

export interface IRenderPropertyKeyframes<T> extends IRenderPropertyBase {
    value: OneOrMany<T>
}

export interface IRenderPropertyTransition<T> extends IRenderPropertyBase {
    value: T
}

export type IRenderPropertyOptions<T> = IRenderPropertyTransition<T> | IRenderPropertyKeyframes<T>
export type IRenderValue<T> = IRenderPropertyOptions<T> | OneOrMany<T>

export interface ITargetGetter {
    (target: {}, prop: string): any
}

export interface ITargetSetter {
    (target: {}, name: string, value: string): void
}

export interface ITransformFn {
    easing?: IEasing
    type: string
    value: number[]
}

/**
 * Single item or array of items
 */
export type OneOrMany<T> = T | T[]

export type ValueType = 'number' | 'discrete' | undefined


export type ICSSTransformTarget = OneOrMany<Element | string>

export interface ICSSTransformOptions extends IRenderFunctionOptions<ICSSTransformTarget> {
    xPercent?: IRenderValue<number>
    yPercent?: IRenderValue<number>
    x?: IRenderValue<number>
    y?: IRenderValue<number>
    z?: IRenderValue<number>
    rotateX?: IRenderValue<number>
    rotateY?: IRenderValue<number>
    rotate?: IRenderValue<number>
    scale?: IRenderValue<number>
}

export interface ICSSTransformOptionsInner extends IRenderFunctionOptions<ICSSTransformTarget> {
    transform: ITransformFn[]
}

export interface IEasing {
    (offset: number): number
}

export interface IEasingAsync {
    (n: number, fn: IRenderFunction): void
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
    parse(value: any, type?: string): IRendererParseResult
    getAdapter(target: any, prop: string): ITargetAdapter
    getTargets(targets: OneOrMany<{} | string>): {}[]
}

export interface IRendererParseResult {
    value: any
    mix: IMixer
    format?: IRenderPropertyFormatter
}

export interface IRenderPropertyFormatter {
    (n: any): any
}

export interface IRenderPropertyBase {
    easing?: IEasing | IEasingAsync
    type?: string
    format?: IRenderPropertyFormatter
    mix?: IMixer
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

export interface ITargetAdapter {
    get: ITargetGetter
    set: ITargetSetter
}

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

// tslint:disable-next-line:interface-name
export interface FloatArray {
    length: number
    [index: number]: number
    join(separator: string): string;
}

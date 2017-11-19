export interface IEasing {
    (offset: number): number
}

export interface IFormatter {
    (n: any): any
}

export type IInterpolateTarget = {} | string

export interface IInterpolateOptions extends IRenderFunctionOptions<IInterpolateTarget> {
    // some complexity in types is required to provide good type completion
    [propName: string]: IRenderValueOptions | OneOrMany<string | number> | IEasing | OneOrMany<IInterpolateTarget>
}

export interface IMixer {
    (a: any, b: any, offset: number): any
}

export interface IRenderFunction {
    (offset: number): void
}

export interface IRenderer<TTarget, TFunctionOptions extends IRenderFunctionOptions<TTarget>> {
    (opts: TFunctionOptions): IRenderFunction
}

export interface IRenderFunctionOptions<T> {
    targets: OneOrMany<T>
    easing?: IEasing
    secondary?: ISecondaryRender
}

export interface IRendererOptions {
    parse(value: any, type?: string): IRendererParseResult
    getAdapter(target: any, prop: string): ITargetAdapter
    getTargets(targets: OneOrMany<{} | string>): {}[]
}

export interface IRendererParseResult {
    value: any
    mix: IMixer
    format?: IFormatter
}

export interface IRenderValueOptions {
    value: OneOrMany<number | string>
    easing?: IEasing
    secondary?: ISecondaryRender
    type?: string
    format?: IFormatter
    mix?: IMixer
}
export interface ISecondaryRender {
    (n: number, fn: IRenderFunction): void
}

export interface ITargetAdapter {
    get(target: {}, prop: string): any
    set(target: {}, name: string, value: string)
}

/**
 * Single item or array of items
 */
export type OneOrMany<T> = T | T[]

export type ValueType = 'number' | 'discrete' | undefined

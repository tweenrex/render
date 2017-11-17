/**
 * Single item or array of items
 */
export type OneOrMany<T> = T | T[]

export type ValueType = 'number' | 'discrete' | undefined

export interface IEasing {
    (offset: number): number
}

export interface ISecondaryRender {
    (n: number, fn: IRenderFunction): void
}

export interface IFormatter {
    (n: any): any
}

export interface IMixer {
    (a: any, b: any, offset: number): any
}

export interface IRenderFunction {
    (offset: number): void
}

export interface IRenderer {
    (opts: IRenderFunctionOptions): IRenderFunction
}

export interface IRendererOptions {
    parse?: (value: any, type?: string) => IRendererParseResult
    getTarget?: ITargetAdapterProvider
}

export interface IRendererParseResult {
    value: any
    mix: IMixer
    format?: IFormatter
}

export interface IRenderFunctionOptions {
    targets: OneOrMany<{}>
    easing?: IEasing
    secondary?: ISecondaryRender

    [propName: string]: Function | OneOrMany<{}> | OneOrMany<string | number> | IRenderValueOptions
}

export interface IRenderValueOptions {
    value: OneOrMany<number | string>
    easing?: IEasing
    secondary?: ISecondaryRender
    type?: 'number' | 'discrete' | 'terms'
    format?: IFormatter
    mix?: IMixer
}

export interface ITargetAdapterProvider {
    (target: any, prop: string): {
        get(target: {}, prop: string): any
        set(target: {}, name: string, value: string)
    }
}

export type ValueType = 'number' | 'discrete' | undefined

export interface IRenderer {
    (opts: IRenderOptions): (offset: number) => void
}

export interface ITargetRenderer {
    target: any
    prop: string
    values: any[]
    mix(a: any, b: any, offset: number): any
    render(target: any, prop: string, t: any): void
}

export interface IRendererOptions {
    value?: (target: any, prop: string) => any
    parse?: (t: any) => any
    mix?: (a: any, b: any, offset: number) => any
    render?: (target: any, t: any) => void
    resolve?: (targets: any) => any[]
    type?: ValueType
}

export interface IRenderOptions {
    targets: any
    easing?: (n: number) => number

    [key: string]: any
}

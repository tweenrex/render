import { ICSSTransform } from '../types'

export function matrixToString(m: ICSSTransform, lUnit?: string, rUnit?: string): string {
    lUnit = lUnit || ''
    rUnit = rUnit || ''
    return `translate(${m.x}${lUnit},${m.y}${lUnit}) `
        + `rotate(${m.rotate}${rUnit}) `
        + `skewX(${m.scaleX}${rUnit}) `
        + `scale(${m.scaleX},${m.scaleY})`;
}

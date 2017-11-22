import { FloatArray } from '../types'
import { isEdge } from './browser';

const arrayConstructor = isEdge ? Array : Float32Array

export function createFloatArray(n: number): FloatArray {
    return new arrayConstructor(n)
}

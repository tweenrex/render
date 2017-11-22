import { FloatArray } from '../types';

export function matrixToString(a: FloatArray): string {
    return 'matrix3d(' + a.join(',') + ')'
}

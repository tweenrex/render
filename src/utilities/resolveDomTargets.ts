import { isArray, pushAll } from './arrays';
import { isString } from './inspect';
import { OneOrMany } from '../types';

export function resolveDomTargets(targets: OneOrMany<string | Element | {}>, results: any[]): void {
    if (isArray(targets)) {
        // recursive call
        for (let i = 0, ilen = targets.length; i < ilen; i++) {
            resolveDomTargets(targets[i], results)
        }
    } else if (isString(targets)) {
        // resolve NodeList
        pushAll(results, document.querySelectorAll(targets as string) as any)
    } else {
        results.push(targets)
    }
}

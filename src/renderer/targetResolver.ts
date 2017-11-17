import { isArray, pushAll } from "../internal/arrays";

export function resolve(targets: any): any[] {
    const results: any[] = []
    resolveInner(targets, results)
    return results
}
function resolveInner(targets: any, results: any[]): void {
    if (isArray(targets)) {
        // recursive call
        targets.forEach(target => resolveInner(target, results))
    } else if (typeof targets === 'string') {
        // resolve NodeList
        pushAll(results, document.querySelectorAll(targets) as any)
    } else {
        results.push(targets)
    }
}

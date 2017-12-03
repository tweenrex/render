const ops: Function[] = []

let frame
export function scheduler(fn: Function) {
    return () => {
        ops.push(fn)
        frame = frame || setTimeout(forceTick, 0) || 1
    }
}

export function forceTick() {
    for (let i = 0; i < ops.length; i++) {
        ops[i]()
    }
    ops.length = 0
    frame = 0
}

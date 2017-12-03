import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'
import { IEasingAsync } from '../../src/index';

describe('interpolate(async easing)', () => {
    it('handles secondary actions at the interpolator level', () => {
        const target = { x: 0 }

        const asyncEasing = ((o, t, fn) => fn(0.5, t)) as IEasingAsync
        asyncEasing.tr_type = 'ASYNC'

        const render = interpolate({
            targets: target,
            // override offset to 0.5 in secondary function
            easing: asyncEasing,
            x: 100
        })

        render(1)
        assert.equal(target.x, 50)
    })

    it('handles secondary actions at the interpolator level', () => {
        const target = { x: 0 }
        const asyncEasing = ((o, t, fn) => fn(0.5, t)) as IEasingAsync
        asyncEasing.tr_type = 'ASYNC'

        const render = interpolate({
            targets: target,
            x: {
                value: 100,
                // override offset to 0.5 in secondary function
                easing: asyncEasing
            }
        })

        render(1)
        assert.equal(target.x, 50)
    })
})

import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(secondary)', () => {
    it('handles secondary actions at the interpolator level', () => {
        const target = { x: 0 }
        const render = interpolate({
            targets: target,
            // override offset to 0.5 in secondary function
            secondary: (o, fn) => fn(0.5),
            x: 100
        })

        render(1)
        assert.equal(target.x, 50)
    })

    it('handles secondary actions at the interpolator level', () => {
        const target = { x: 0 }
        const render = interpolate({
            targets: target,
            x: {
                value: 100,
                // override offset to 0.5 in secondary function
                secondary: (o, fn) => fn(0.5)
            }
        })

        render(1)
        assert.equal(target.x, 50)
    })
})

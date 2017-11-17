import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(easing)', () => {
    it('handles easing at the interpolator level', () => {
        const target = { x: 0 }
        const render = interpolate({
            targets: target,
            easing: o => 1.2,
            x: 100
        })

        render(1)
        assert.equal(target.x, 120)
    })

    it('handles easing at the property level', () => {
        const target = { x: 0 }
        const render = interpolate({
            targets: target,
            x: {
                value: 100,
                easing: o => 1.2
            }
        })

        render(1)
        assert.equal(target.x, 120)
    })
})

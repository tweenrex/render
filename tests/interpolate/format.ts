import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(format)', () => {
    it('allows overriding the format of the property ', () => {
        const target = { x: 0 }
        const render = interpolate({
            targets: target,
            x: {
                value: 100,
                // override to just use offset as value
                mix: (a, b, o) => o
            }
        })

        render(.5)
        assert.equal(target.x, .5)
    })

    it('allows overriding the mix of the property ', () => {
        const target = { x: 0 }
        const render = interpolate({
            targets: target,
            x: {
                value: 100,
                // override to set 'px' before setting
                format: e => e + 'px'
            }
        })

        render(.5)
        assert.equal(target.x, '50px' as any)
    })
})

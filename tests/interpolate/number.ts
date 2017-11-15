import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(number)', () => {
    it('interpolates numbers in strings', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: ['200', '400']
        })

        renderer(.5)
        assert.equal(target.x, 300)
    })
    it('interpolates a number at 0.5', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: [200, 400]
        })

        renderer(.5)
        assert.equal(target.x, 300)
    })
    it('interpolates with 3+ values', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: [200, 300, 400]
        })

        renderer(.75)
        assert.equal(target.x, 350)
    })
    it('interpolates with 5+ values', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: [0, 100, 200, 300, 400]
        })

        renderer(.75)
        assert.equal(target.x, 300)
    })
    it('correctly uses the existing value as the starting point if property is not an array', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: 1000
        })

        renderer(.5)
        assert.equal(target.x, 500)
    })
    it('handles below range interpolation', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: [200, 400]
        })

        renderer(-.5)
        assert.equal(target.x, 100)
    })
    it('handles above range interpolation', () => {
        const target = { x: 0 }
        const renderer = interpolate({
            targets: target,
            x: [200, 400]
        })

        renderer(1.5)
        assert.equal(target.x, 500)
    })
})

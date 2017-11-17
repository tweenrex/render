import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(discrete)', () => {
    it('interpolates a discrete at 0.5', () => {
        const target = { innerHTML: '' }
        const render = interpolate({
            targets: target,
            innerHTML: ['yep', 'nope']
        })

        render(0.5)
        assert.equal(target.innerHTML, 'nope')
    })
    it('interpolates with 3+ discrete values', () => {
        const target = { innerHTML: '' }
        const render = interpolate({
            targets: target,
            innerHTML: ['yep', 'maybe', 'nope']
        })

        render(0.74)
        assert.equal(target.innerHTML, 'maybe')
    })
    it('interpolates with 5+ discrete values', () => {
        const target = { innerHTML: '' }
        const render = interpolate({
            targets: target,
            innerHTML: ['yep', 'nope', 'sometimes', 'maybe', 'try again later']
        })

        render(0.75)
        assert.equal(target.innerHTML, 'maybe')
    })
    it('correctly uses the existing value as the starting point if property is not an array', () => {
        const target = { innerHTML: 'nope' }
        const render = interpolate({
            targets: target,
            innerHTML: 'yep'
        })

        render(0.5)
        assert.equal(target.innerHTML, 'yep')
    })

    it('handles below range interpolation', () => {
        const target = { innerHTML: 'nope' }
        const render = interpolate({
            targets: target,
            innerHTML: 'yep'
        })

        render(-0.5)
        assert.equal(target.innerHTML, 'nope')
    })

    it('handles above range interpolation', () => {
        const target = { innerHTML: 'nope' }
        const render = interpolate({
            targets: target,
            innerHTML: 'yep'
        })

        render(1.5)
        assert.equal(target.innerHTML, 'yep')
    })

    it('allows type overrides to discrete', () => {
        const target = { innerHTML: 0 }
        const render = interpolate({
            targets: target,
            innerHTML: {
                value: 1,
                type: 'discrete'
            }
        })

        render(1.5)
        assert.equal(target.innerHTML, 1)
    })
})

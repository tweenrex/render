import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(debug)', () => {
    it('debug function is hit for each target and provides render function', done => {
        const target = { innerHTML: '' }

        const render = interpolate({
            targets: target,
            innerHTML: ['yep', 'nope'],
            debug: (t, fn) => {
                assert.equal(t, target)
                assert.equal(typeof fn, 'function')
                done()
            }
        })
    })
})

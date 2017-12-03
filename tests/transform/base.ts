import { assert } from 'chai'
import { transform } from '../../src/transform'
import { forceTick } from '../../src/utilities/scheduler';

const xCSSMatrix = require('xcssmatrix')

describe('transform()', () => {
    beforeAll(() => {
         const w = window as any
         w.DOMMatrix = xCSSMatrix
    })

    it('calculates midpoint (.5) between translate(0px) and translate(40px, 60px)', () => {
        const target = document.createElement('div')
        document.body.appendChild(target)

        const renderer = transform({
            targets: target,
            x: 40,
            y: 60
        });

        renderer(.5)
        forceTick()

        assert.equal(target.style.transform, 'translate(20px,30px)')

        document.body.removeChild(target)
    })

    it('calculates midpoint (.5) between rotate(0deg) and rotate(360)', () => {
        const target = document.createElement('div')
        document.body.appendChild(target)

        const renderer = transform({
            targets: target,
            rotate: 360
        });

        renderer(.5)
        forceTick()

        assert.equal(target.style.transform, 'rotate(180deg)')

        document.body.removeChild(target)
    })

    it('calculates midpoint (.5) between translate(0px) rotate(0deg) and translate(100px) rotate(360)', () => {
        const target = document.createElement('div')
        document.body.appendChild(target)

        const renderer = transform({
            targets: target,
            rotate: 360,
            x: 100
        });

        renderer(.5)
        forceTick()

        assert.equal(target.style.transform, 'translate(50px,0px) rotate(180deg)')

        document.body.removeChild(target)
    })
})

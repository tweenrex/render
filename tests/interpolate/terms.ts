import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(discrete)', () => {
    it('interpolates px', () => {
        const target = { left: '' }
        const render = interpolate({
            targets: target,
            left: ['0px', '100px']
        })

        render(0.5)
        assert.equal(target.left, '50px')
    })
    it('interpolates em', () => {
        const target = { left: '' }
        const render = interpolate({
            targets: target,
            left: ['0em', '100em']
        })

        render(0.5)
        assert.equal(target.left, '50em')
    })
    it('interpolates rem', () => {
        const target = { left: '' }
        const render = interpolate({
            targets: target,
            left: ['0rem', '100rem']
        })

        render(0.5)
        assert.equal(target.left, '50rem')
    })
    it('interpolates deg', () => {
        const target = { left: '' }
        const render = interpolate({
            targets: target,
            left: ['0deg', '100deg']
        })

        render(0.5)
        assert.equal(target.left, '50deg')
    })
    it('interpolates #hex(3) colors', () => {
        const target = { color: '' }
        const render = interpolate({
            targets: target,
            color: ['#f00', '#00f']
        })

        render(0.5)
        assert.equal(target.color, 'rgb(180,0,180)')
    })
    it('interpolates #hex(6) colors', () => {
        const target = { color: '' }
        const render = interpolate({
            targets: target,
            color: ['#ff0000', '#0000ff']
        })

        render(0.5)
        assert.equal(target.color, 'rgb(180,0,180)')
    })
    it('interpolates rgb() colors', () => {
        const target = { color: '' }
        const render = interpolate({
            targets: target,
            color: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)']
        })

        render(0.5)
        assert.equal(target.color, 'rgb(180,0,180)')
    })
    it('interpolates rgba() colors', () => {
        const target = { color: '' }
        const render = interpolate({
            targets: target,
            color: ['rgba(255, 0, 0, 0)', 'rgba(0, 0, 255, 1)']
        })

        render(0.5)
        assert.equal(target.color, 'rgba(180,0,180,0.5)')
    })
    it('interpolates hsl() colors', () => {
        const target = { color: '' }
        const render = interpolate({
            targets: target,
            color: ['hsl(0, 0%, 0%)', 'hsl(360, 100%, 100%)']
        })

        render(0.5)
        assert.equal(target.color, 'hsl(180,50%,50%)')
    })
    it('interpolates hsl() colors', () => {
        const target = { color: '' }
        const render = interpolate({
            targets: target,
            color: ['hsla(0, 0%, 0%, 0)', 'hsla(360, 100%, 100%, 1)']
        })

        render(0.5)
        assert.equal(target.color, 'hsla(180,50%,50%,0.5)')
    })
    it('interpolates point arrays separated by spaces', () => {
        const target = { points: '' }
        const render = interpolate({
            targets: target,
            points: ['24 -.34 0.2222', '48 .34 -0.2222']
        })

        render(0.5)
        assert.equal(target.points, '36 0 0')
    })

})

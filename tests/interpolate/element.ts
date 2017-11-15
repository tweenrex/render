import { assert } from 'chai'
import { interpolate } from '../../src/interpolate'

describe('interpolate(element)', () => {
    it('resolves css selectors', () => {
        const target = document.createElement('div')
        target.id = 'myTarget'
        target['custom'] = 2
        document.body.appendChild(target)

        const render = interpolate({
            targets: '#myTarget',
            custom: [0, 10]
        })

        render(0.5)
        assert.equal(target['custom'], 5)

        document.body.appendChild(target)
    })

    it('resolves css selectors with more than one result', () => {
        const target1 = document.createElement('div')
        target1.classList.add('target')
        target1['custom'] = 2
        document.body.appendChild(target1)

        const target2 = document.createElement('div')
        target2.classList.add('target')
        target2['custom'] = 2
        document.body.appendChild(target2)

        const render = interpolate({
            targets: '.target',
            custom: [0, 10]
        })

        render(0.5)
        assert.equal(target1['custom'], 5)
        assert.equal(target2['custom'], 5)

        document.body.appendChild(target1)
        document.body.appendChild(target2)
    })

    it('resolves multiple selectors and objects', () => {
        const target1 = document.createElement('div')
        target1.classList.add('target')
        target1['custom'] = 2
        document.body.appendChild(target1)

        const target2 = document.createElement('div')
        target2.classList.add('target')
        target2['custom'] = 2
        document.body.appendChild(target2)

        const target3 = document.createElement('div')
        target3.id = 'target'
        target3['custom'] = 2
        document.body.appendChild(target3)

        const target4 = document.createElement('div')
        target4['custom'] = 2

        const render = interpolate({
            targets: ['.target', '#target', target4],
            custom: [0, 10]
        })

        render(0.5)
        assert.equal(target1['custom'], 5)
        assert.equal(target2['custom'], 5)
        assert.equal(target3['custom'], 5)
        assert.equal(target4['custom'], 5)

        document.body.appendChild(target1)
        document.body.appendChild(target2)
        document.body.appendChild(target3)
    })

    it('interpolates hyphenated attributes', () => {
        const target = document.createElement('div')
        target.setAttribute('data-id', '0')

        const render = interpolate({
            targets: target,
            dataId: [0, 10]
        })

        render(0.5)
        assert.equal(target.getAttribute('data-id'), '5')
    })

    it('interpolates hyphenated properties', () => {
        const target = document.createElement('div')
        target.setAttribute('data-id', '0')

        const render = interpolate({
            targets: target,
            'data-id': [0, 10]
        })

        render(0.5)
        assert.equal(target.getAttribute('data-id'), '5')
    })

    it('interpolates innerHTML', () => {
        const target = document.createElement('div')

        const render = interpolate({
            targets: target,
            innerHTML: ['first', 'second']
        })

        render(0.5)
        assert.equal(target.innerHTML, 'second')
    })

    it('interpolates opacity', () => {
        const target = document.createElement('div')

        const render = interpolate({
            targets: target,
            opacity: [0, 1]
        })

        render(0.5)
        assert.equal(target.style.opacity, '0.5')
    })
})

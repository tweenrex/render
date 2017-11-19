export function hexToRgb(stringValue: string) {
    const hexRegex = /#(([a-f0-9]{6})|([a-f0-9]{3}))$/i
    const match = stringValue.match(hexRegex)
    if (!match) {
        return stringValue
    }

    const hex = match[1]
    const hexColor = parseInt(hex.length === 3 ? hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] : hex, 16)
    const r = (hexColor >> 16) & 0xff
    const g = (hexColor >> 8) & 0xff
    const b = hexColor & 0xff

    return `rgb(${r},${g},${b})`
}

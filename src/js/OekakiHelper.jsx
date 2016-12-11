import { BLEND_MODE } from './BlendMode'

const changeColor = ({color1, color2}) => {
	const [bottomOpacity, bottomBlendMode, bottomColor] = color1;
	const [topOpacity, topBlendMode, topColor] = color2;

	const bottomColorRGB = new RGBColor(bottomColor);
	const topColorRGB = new RGBColor(topColor);

	const mixedColor = [topBlendMode]

	const {r: r1, g: g1, b: b1} = bottomColorRGB
	const {r: r2, g: g2, b: b2} = topColorRGB

	const r3 = Math.floor(r2 * topOpacity / 100 + r1 * (100 - topOpacity) / 100);
	const g3 = Math.floor(g2 * topOpacity / 100 + g1 * (100 - topOpacity) / 100);
	const b3 = Math.floor(b2 * topOpacity / 100 + b1 * (100 - topOpacity) / 100);

	let color = '';
	switch (BLEND_MODE[topBlendMode].type) {
		case 'normal':
			color = `rgb(${[
				r3,
				g3,
				b3,
			].join(',')})`
			mixedColor.push(topColor ? new RGBColor(color).toHex() : bottomColor)
			break

		case 'multiply':
			color = `rgb(${[
				Math.floor((r1 * (r2) / 255)),
				Math.floor((g1 * (g2) / 255)),
				Math.floor((b1 * (b2) / 255)),
			].join(',')})`

			mixedColor.push(topColor ? new RGBColor(color).toHex() : bottomColor)
			break

		case 'lighten':
			color = `rgb(${[
				r2 > r1 ? r2 : r1,
				g2 > g1 ? g2 : g1,
				b2 > b1 ? b2 : b1,
			].join(',')})`
			mixedColor.push(topColor ? new RGBColor(color).toHex() : bottomColor)
			break

		case 'darken':
			color = `rgb(${[
				r2 < r1 ? r2 : r1,
				g2 < g1 ? g2 : g1,
				b2 < b1 ? b2 : b1,
			].join(',')})`
			mixedColor.push(topColor ? new RGBColor(color).toHex() : bottomColor)
			break

		case 'screen':
			color = `rgb(${[
				(255 - (((255 - r1) * (255- r2)) >> 8)),
				(255 - (((255 - g1) * (255- g2)) >> 8)),
				(255 - (((255 - b1) * (255- b2)) >> 8))
			].join(',')})`
			mixedColor.push(topColor ? new RGBColor(color).toHex() : bottomColor)
			break

		default:
			mixedColor.push(topColor || bottomColor)

			break
	}

	return mixedColor
}

export const selectColor = (colors) => {
	return colors.reduce((color1, color2) =>	{
		return changeColor({color1, color2})
	})[1]
}

import { BLEND_MODE } from './BlendMode'

//blendMode sample site
//http://jsdo.it/akm2/3PMd
//http://d.hatena.ne.jp/yus_iri/20110921/1316610121

const addAlphaColor = ({r, g, b, bottomAlpha, topAlpha}) => {
	const [r1, r2 ,r3] = r
	const [g1, g2 ,g3] = g
	const [b1, b2 ,b3] = b
	const a1 = topAlpha * bottomAlpha
	const a2 = topAlpha * (1 - bottomAlpha)
	const a3 = (1 - topAlpha) * bottomAlpha

	const a = a1 + a2 + a3

	return [
		Math.floor((a1 * r3 + a2 * r2 + a3 * r1) / a),
		Math.floor((a1 * g3 + a2 * g2 + a3 * g1) / a),
		Math.floor((a1 * b3 + a2 * b2 + a3 * b1) / a),
	]
}

const changeColor = ({color1, color2}) => {
	const [bottomAlpha, bottomBlendMode, bottomColor] = color1;
	const [topAlpha, topBlendMode, topColor] = color2;

	const bottomColorRGB = new RGBColor(bottomColor);
	const topColorRGB = new RGBColor(topColor);

	const mixedColor = [topBlendMode]

	const {r: r1, g: g1, b: b1} = bottomColorRGB
	const {r: r2, g: g2, b: b2} = topColorRGB

	let formula = () => {}
	switch (BLEND_MODE[topBlendMode].type) {
		case 'normal':
			formula = (c1, c2) => c2
			break

		case 'multiply':
			formula = (c1, c2) => c1 * c2 / 255
			break

		case 'lighten':
			formula = (c1, c2) => c2 > c1 ? c2 : c1
			break

		case 'darken':
			formula = (c1, c2) => c2 < c1 ? c2 : c1
			break

		case 'screen':
			formula = (c1, c2) => (255 - (((255 - c1) * (255- c2)) >> 8))
			break

		case 'overlay':
			formula = (c1, c2) => c1 > 128 ? c2 + (2 * c1 - 255) - c2 * (2 * c1 - 255) / 255 : c2 * 2 * c1 / 255
			break

		default:
			formula = (c1, c2) => c2

			break
	}

	const [r3, g3, b3] = [
		formula(r1, r2),
		formula(g1, g2),
		formula(b1, b2),
	]

	const alphaColor = addAlphaColor({
		r: [r1, r2, r3],
		g: [g1, g2, g3],
		b: [b1, b2, b3],
		bottomAlpha,
		topAlpha
	});
	mixedColor.push(topColor ? new RGBColor(`rgb(${alphaColor})`).toHex() : bottomColor)
	return mixedColor
}

export const selectColor = (colors) => {
	return colors.reduce((color1, color2) =>	{
		return changeColor({color1, color2})
	})[1]
}

import * as sr from "seedrandom";

interface rgbaColor {
	r: number;
	g: number;
	b: number;
	[key: string]: number;
}

const stringToRgb = (
	string: string,
	baseColor: rgbaColor = { r: 255, g: 255, b: 255 },
	darken: number = 2
): string => {
	let finalColor: rgbaColor = { r: 0, g: 0, b: 0 };

	if (string.length) {
		let seed = Math.abs(sr(string).int32());
		for (let key in finalColor) {
			finalColor[key] = Math.round(
				(seed % 255 + baseColor[key]) / (2 * darken)
			);
			seed = seed * seed;
		}
	}

	const { r, g, b } = finalColor;

	return `rgb(${r},${g},${b})`;
};

export default stringToRgb;

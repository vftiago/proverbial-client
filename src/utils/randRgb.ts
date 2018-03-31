import randInt from "./randInt";

interface rgbColor {
	r: number;
	g: number;
	b: number;
	[key: string]: number;
}

const stringToRgb = (
	baseColor: rgbColor = { r: 255, g: 255, b: 255 },
	darken: number = 1.8
): string => {
	let finalColor: rgbColor = { r: 0, g: 0, b: 0 };

	for (let key in finalColor) {
		finalColor[key] = Math.round(
			(randInt(0, 255) + baseColor[key]) / (2 * darken)
		);
	}

	const { r, g, b } = finalColor;

	return `rgb(${r},${g},${b})`;
};

export default stringToRgb;

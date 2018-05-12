import * as sr from "seedrandom";

interface rgbColor {
    r: number;
    g: number;
    b: number;
    [key: string]: number;
}

const stringToRgb = (
    string: string,
    baseColor: rgbColor = { r: 255, g: 255, b: 255 },
    darken: number = 2
): string => {
    let finalColor: rgbColor = { r: 0, g: 0, b: 0 };
    let colorSeeds: rgbColor = { r: 0, g: 0, b: 0 };

    if (string.length) {
        let seed = Math.abs(sr(string).int32());
        let digits = ("" + seed).split("");

        colorSeeds["r"] = parseInt(digits.splice(0, 3).join("")) % 255;
        colorSeeds["g"] = parseInt(digits.splice(0, 3).join("")) % 255;
        colorSeeds["b"] = parseInt(digits.splice(0, 3).join("")) % 255;

        for (let key in finalColor) {
            finalColor[key] = Math.round(
                (colorSeeds[key] + baseColor[key]) / (2 * darken)
            );
        }
    }

    const { r, g, b } = finalColor;

    return `rgb(${r},${g},${b})`;
};

export default stringToRgb;

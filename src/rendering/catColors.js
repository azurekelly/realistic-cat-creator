import {blendAlpha} from '../utils/color-utils';

export const getEumelaninAbsorption = concentration => {
    // tweaked from the canonical absorption values to look nicer
    const eumelaninAbsorption = [0.45, 0.74, 1.47];
    return eumelaninAbsorption.map(x => x * (concentration / 100));
};

export const getPheomelaninAbsorption = concentration => {
    // tweaked from the canonical absorption values to look nicer
    const pheomelaninAbsorption = [0.205, 0.44, 0.9];
    return pheomelaninAbsorption.map(x => x * (concentration / 100));
};

export const simulateMelanin = (melaninType, intensity, dilution) => {
    const absorption = melaninType === 'pheomelanin' ? getPheomelaninAbsorption(intensity) : getEumelaninAbsorption(intensity);
    // "magic number" used to lighten colors closer to what we'd perceive as the "local color"
    const ambientOffest = 30;
    // lambert-beer's model formula for transmittance (with a length of 1)
    // gives more accurate colors than a reflectance formula
    const transmittance = absorption.map(x => Math.exp(-x));
    const melaninRgb = transmittance.map(x => x * 255 + ambientOffest);
    return blendAlpha(melaninRgb, [255, 255, 255], dilution); // dilutes color
};


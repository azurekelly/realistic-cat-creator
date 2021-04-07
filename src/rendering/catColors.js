import {rgbToHex, blendAlpha} from '../utils/color-utils';
import {mapTraitToRange} from '../utils/utils';

// CONSTANTS
export const CONSTANTS = {
    blackIntensity: 900,
    chocolateIntensity: 400,
    cinnamonIntensity: 225,
    redMinIntensity: 225,
    redMaxIntensity: 375,
    dilutionMin: 0.3,
    dilutionMax: 0.65,
    agoutiFactor: 0.15,
    agoutiSilverFactor: 0.8,
    redSilverFactor: 0.1,
    agoutiContrastMin: 0.275,
    agoutiContrastMax: 0.65,
    // for currently unknown reasons, silver cats appear much lighter than if you just change out the agouti color
    // contrast values have been altered to temporarily fix this until the problem is solved
    silverContrastMin: 0.55,
    silverContrastMax: 0.85,
    widebandContrastMin: 0.77,
    widebandContrastMax: 0.85,
    pointLightFactor: 0.05, // similar enough for black and red to be the same factors
    pointBlackLightFactor: 0.025,
    minkLightFactor: 0.16,
    sepiaLightFactor: 0.4,
    pointDarkFactor: 0.9,
    pointRedFactor: 0.6 // darker factor is more different so it needs it own
};

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

export const simulateMelanin = (melaninType, intensity, dilution, silvering) => {
    const absorption = melaninType === 'pheomelanin' ? getPheomelaninAbsorption(intensity) : getEumelaninAbsorption(intensity);
    // "magic number" used to lighten colors closer to what we'd perceive as the "local color"
    const ambientOffest = 30;
    // lambert-beer's model formula for transmittance (with a length of 1)
    // gives more accurate colors than a reflectance formula
    const transmittance = absorption.map(x => Math.exp(-x));
    const melaninRgb = transmittance.map(x => x * 255 + ambientOffest);
    const silverRgb = blendAlpha(melaninRgb, [255, 255, 255], silvering); // performs silvering dilution
    return blendAlpha(silverRgb, [255, 255, 255], dilution); // dilutes color
};

export const getBlackSettings = (cat, pointLight = false) => {
    const baseIntensity = CONSTANTS[cat.baseColor + 'Intensity'];
    let pointFactor = 1;
    if(cat.point !== 'standard') {
        if(pointLight) {
            if(cat.point === 'point' && cat.baseColor === 'black') {
                pointFactor = CONSTANTS.pointBlackLightFactor;
            }
            else {
                pointFactor = CONSTANTS[cat.point + 'LightFactor'];
            }
        }
        else {
            pointFactor = CONSTANTS.pointDarkFactor;
        }
    }
    return [
        'eumelanin',
        baseIntensity * pointFactor,
        cat.dilute ? mapTraitToRange(cat.dilution, CONSTANTS.dilutionMin, CONSTANTS.dilutionMax) : 0,
        0
    ];
};

export const getRedSettings = (cat, pointLight = false) => {
    const baseIntensity = mapTraitToRange(cat.redness, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity);
    const pointFactor = cat.point === 'standard' ? 1 : (
        pointLight ? CONSTANTS[cat.point + 'LightFactor'] : CONSTANTS.pointRedFactor
    );
    return [
        'pheomelanin',
        baseIntensity * pointFactor,
        cat.dilute ? mapTraitToRange(cat.dilution, CONSTANTS.dilutionMin, CONSTANTS.dilutionMax) : 0,
        cat.silver ? CONSTANTS.redSilverFactor : 0
    ];
};

export const getAgoutiSettings = (cat, pointLight = false) => {
    const baseIntensity = mapTraitToRange(cat.redness, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity);
    const pointFactor = cat.point === 'standard' ? 1 : (
        pointLight ? CONSTANTS[cat.point + 'LightFactor'] : CONSTANTS.pointRedFactor
    );
    return [
        'pheomelanin',
        baseIntensity * pointFactor * CONSTANTS.agoutiFactor,
        cat.dilute ? mapTraitToRange(cat.dilution, CONSTANTS.dilutionMin, CONSTANTS.dilutionMax) : 0,
        cat.silver ? CONSTANTS.agoutiSilverFactor : 0
    ];
};

const blendAgouti = (baseSettings, cat, pointLight = false) => {
    const baseRgb = simulateMelanin(...baseSettings);
    const agoutiRgb = simulateMelanin(...getAgoutiSettings(cat, pointLight));
    if(cat.pattern === 'shaded' || cat.pattern === 'tipped') {
        return rgbToHex(blendAlpha(baseRgb, agoutiRgb, mapTraitToRange(cat.patternContrast, CONSTANTS.widebandContrastMin, CONSTANTS.widebandContrastMax)));
    }
    if(cat.silver) {
        return rgbToHex(blendAlpha(baseRgb, agoutiRgb, mapTraitToRange(cat.patternContrast, CONSTANTS.silverContrastMin, CONSTANTS.silverContrastMax)));
    }
    return rgbToHex(blendAlpha(baseRgb, agoutiRgb, mapTraitToRange(cat.patternContrast, CONSTANTS.agoutiContrastMin, CONSTANTS.agoutiContrastMax)));
};

// red methods need to be separate for ease of getting tortie colors
export const getRedGroundColor = (cat, pointLight = false) => blendAgouti(getRedSettings(cat, pointLight), cat, pointLight);

export const getRedTopColor = (cat, pointLight = false) => rgbToHex(simulateMelanin(...getRedSettings(cat, pointLight)));

export const getBlackGroundColor = (cat, pointLight = false) => {
    if(cat.tabby) {
        return blendAgouti(getBlackSettings(cat, pointLight), cat, pointLight);
    }
    return rgbToHex(simulateMelanin(...getBlackSettings(cat, pointLight)));
};

export const getBlackTopColor = (cat, pointLight = false) => {
    if(!cat.tabby && cat.silver) { // weird case for smoke only
        return rgbToHex(simulateMelanin(...getAgoutiSettings(cat, pointLight)));
    }
    return rgbToHex(simulateMelanin(...getBlackSettings(cat, pointLight)));
};
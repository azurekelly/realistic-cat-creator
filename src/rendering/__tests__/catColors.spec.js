import {
    getEumelaninAbsorption,
    getPheomelaninAbsorption,
    simulateMelanin,
    CONSTANTS,
    getBlackSettings,
    getRedSettings,
    getAgoutiSettings
} from '../catColors';
import {mapTraitToRange} from '../../utils/utils';

describe('getEumelaninAbsorption', () => {
    it('returns expected absorption value for a given concentration', () => {
        const eumelaninAbsorption = getEumelaninAbsorption(500);
        const expectedAbsorption = [2.25, 3.70, 7.35];
        eumelaninAbsorption.forEach((x, i) => {
            expect(eumelaninAbsorption[i]).toBeCloseTo(expectedAbsorption[i]);
        });
    });
});

describe('getPheomelaninAbsorption', () => {
    it('returns expected absorption value for a given concentration', () => {
        const pheomelaninAbsorption = getPheomelaninAbsorption(250);
        const expectedAbsorption = [0.5125, 1.1, 2.25];
        pheomelaninAbsorption.forEach((x, i) => {
            expect(pheomelaninAbsorption[i]).toBeCloseTo(expectedAbsorption[i]);
        });
    });
});

describe('simulateMelanin', () => {
    it('returns expected rgb color for undiluted eumelanin', () => {
        const melaninRgb = simulateMelanin('eumelanin', 400, 0, 0);
        const expectedRgb = [72.151, 43.213, 30.712];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for diluted eumelanin', () => {
        const melaninRgb = simulateMelanin('eumelanin', 500, 0.4, 0);
        const expectedRgb = [136.126, 123.782, 120.098];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for silver eumelanin', () => {
        const melaninRgb = simulateMelanin('eumelanin', 300, 0, 0.6);
        const expectedRgb = [191.4425, 176.078, 166.239];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for diluted silver eumelanin', () => {
        const melaninRgb = simulateMelanin('eumelanin', 900, 0.3, 0.5);
        const expectedRgb = [177.804, 176.364, 176.250];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for undiluted pheomelanin', () => {
        const melaninRgb = simulateMelanin('pheomelanin', 250, 0, 0);
        const expectedRgb = [182.744, 114.882, 56.876];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for diluted pheomelanin', () => {
        const melaninRgb = simulateMelanin('pheomelanin', 350, 0.6, 0);
        const expectedRgb = [214.773, 186.866, 169.370];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for silver pheomelanin', () => {
        const melaninRgb = simulateMelanin('pheomelanin', 375, 0, 0.35);
        const expectedRgb = [185.590, 140.582, 114.421];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });

    it('returns expected rgb color for diluted silver pheomelanin', () => {
        const melaninRgb = simulateMelanin('pheomelanin', 290, 0.4, 0.2);
        const expectedRgb = [214.545, 181.168, 156];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });
});

describe('getBlackSettings', () => {
    it('handles black cats', () => {
        const settings = getBlackSettings({baseColor: 'black', dilute: false, point: 'standard', silver: false});
        expect(settings).toHaveLength(4);
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBe(CONSTANTS.blackIntensity);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles chocolate cats', () => {
        const settings = getBlackSettings({baseColor: 'chocolate', dilute: false, point: 'standard', silver: false});
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBe(CONSTANTS.chocolateIntensity);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles cinnamon cats', () => {
        const settings = getBlackSettings({baseColor: 'cinnamon', dilute: false, point: 'standard', silver: false});
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBe(CONSTANTS.cinnamonIntensity);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles dilute cats', () => {
        const settings = getBlackSettings({baseColor: 'black', dilute: true, dilution: 6, point: 'standard', silver: false});
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBe(CONSTANTS.blackIntensity);
        expect(settings[2]).toBeCloseTo(mapTraitToRange(6, CONSTANTS.dilutionMin, CONSTANTS.dilutionMax));
        expect(settings[3]).toBe(0);
    });

    it('handles silver cats', () => {
        const settings = getBlackSettings({baseColor: 'black', dilute: false, point: 'standard', silver: true});
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBe(CONSTANTS.blackIntensity);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0); // base black should not change with silver, only agouti or red should
    });

    it('handles colorpoint dark colors', () => {
        const colorpoints = ['point', 'mink', 'sepia'];
        colorpoints.forEach(colorpoint => {
            const settings = getBlackSettings({baseColor: 'black', dilute: false, point: colorpoint, silver: false}, false);
            expect(settings[0]).toBe('eumelanin');
            expect(settings[1]).toBeCloseTo(CONSTANTS.blackIntensity * CONSTANTS.pointDarkFactor); // dark color doesn't change between types
            expect(settings[2]).toBe(0);
            expect(settings[3]).toBe(0);
        });
    });

    it('handles point light colors', () => {
        const settings = getBlackSettings({baseColor: 'chocolate', dilute: false, point: 'point', silver: false}, true);
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBeCloseTo(CONSTANTS.chocolateIntensity * CONSTANTS.pointLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles mink light colors', () => {
        const settings = getBlackSettings({baseColor: 'black', dilute: false, point: 'mink', silver: false}, true);
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBeCloseTo(CONSTANTS.blackIntensity * CONSTANTS.minkLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('has lighter point factor for black than other colors', () => {
        const settings = getBlackSettings({baseColor: 'black', dilute: false, point: 'point', silver: false}, true);
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBeCloseTo(CONSTANTS.blackIntensity * CONSTANTS.pointBlackLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles sepia light colors', () => {
        const settings = getBlackSettings({baseColor: 'black', dilute: false, point: 'sepia', silver: false}, true);
        expect(settings[0]).toBe('eumelanin');
        expect(settings[1]).toBeCloseTo(CONSTANTS.blackIntensity * CONSTANTS.sepiaLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });
});

describe('getRedSettings', () => {
    it('handles red cats with varying redness', () => {
        const rednesses = [4, 8, 12];

        rednesses.forEach(redness => {
            const settings = getRedSettings({redness: redness, dilute: false, point: 'standard', silver: false});
            expect(settings).toHaveLength(4);
            expect(settings[0]).toBe('pheomelanin');
            expect(settings[1]).toBeCloseTo(mapTraitToRange(redness, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity));
            expect(settings[2]).toBe(0);
            expect(settings[3]).toBe(0);
        });
    });

    it('handles cream cats', () => {
        const settings = getRedSettings({redness: 6, dilute: true, dilution: 10, point: 'standard', silver: false});
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(6, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity));
        expect(settings[2]).toBeCloseTo(mapTraitToRange(10, CONSTANTS.dilutionMin, CONSTANTS.dilutionMax));
        expect(settings[3]).toBe(0);
    });

    it('handles silver cats', () => {
        const settings = getRedSettings({redness: 9, dilute: false, point: 'standard', silver: true});
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(9, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity));
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(CONSTANTS.redSilverFactor);
    });

    it('handles colorpoint dark colors', () => {
        const colorpoints = ['point', 'mink', 'sepia'];
        colorpoints.forEach(colorpoint => {
            const settings = getRedSettings({redness: 2, dilute: false, point: colorpoint, silver: false});
            expect(settings[0]).toBe('pheomelanin');
            expect(settings[1]).toBeCloseTo(mapTraitToRange(2, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.pointRedFactor); // dark color doesn't change between types
            expect(settings[2]).toBe(0);
            expect(settings[3]).toBe(0);
        });
    });

    it('handles point light colors', () => {
        const settings = getRedSettings({redness: 13, dilute: false, point: 'point', silver: false}, true);
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(13, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.pointLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles mink light colors', () => {
        const settings = getRedSettings({redness: 7, dilute: false, point: 'mink', silver: false}, true);
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(7, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.minkLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles sepia light colors', () => {
        const settings = getRedSettings({redness: 2, dilute: false, point: 'sepia', silver: false}, true);
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(2, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.sepiaLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });
});

describe('getAgoutiSettings', () => {
    it('handles cats with varying redness', () => {
        const rednesses = [2, 5, 15];

        rednesses.forEach(redness => {
            const settings = getAgoutiSettings({redness: redness, dilute: false, point: 'standard', silver: false});
            expect(settings).toHaveLength(4);
            expect(settings[0]).toBe('pheomelanin');
            expect(settings[1]).toBeCloseTo(mapTraitToRange(redness, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor);
            expect(settings[2]).toBe(0);
            expect(settings[3]).toBe(0);
        });
    });

    it('handles silver cats', () => {
        const settings = getAgoutiSettings({redness: 12, dilute: false, point: 'standard', silver: true});
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(12, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(CONSTANTS.agoutiSilverFactor);
    });

    it('handles dilute cats', () => {
        const settings = getAgoutiSettings({redness: 14, dilute: true, dilution: 7, point: 'standard', silver: false});
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(14, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor);
        expect(settings[2]).toBe(mapTraitToRange(7, CONSTANTS.dilutionMin, CONSTANTS.dilutionMax));
        expect(settings[3]).toBe(0);
    });

    it('handles colorpoint dark colors', () => {
        const colorpoints = ['point', 'mink', 'sepia'];
        colorpoints.forEach(colorpoint => {
            const settings = getAgoutiSettings({redness: 13, dilute: false, point: colorpoint, silver: false});
            expect(settings[0]).toBe('pheomelanin');
            expect(settings[1]).toBeCloseTo(mapTraitToRange(13, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor * CONSTANTS.pointRedFactor); // dark color doesn't change between types
            expect(settings[2]).toBe(0);
            expect(settings[3]).toBe(0);
        });
    });

    it('handles point light colors', () => {
        const settings = getAgoutiSettings({redness: 11, dilute: false, point: 'point', silver: false}, true);
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(11, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor * CONSTANTS.pointLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles mink light colors', () => {
        const settings = getAgoutiSettings({redness: 9, dilute: false, point: 'mink', silver: false}, true);
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(9, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor * CONSTANTS.minkLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });

    it('handles sepia light colors', () => {
        const settings = getAgoutiSettings({redness: 4, dilute: false, point: 'sepia', silver: false}, true);
        expect(settings[0]).toBe('pheomelanin');
        expect(settings[1]).toBeCloseTo(mapTraitToRange(4, CONSTANTS.redMinIntensity, CONSTANTS.redMaxIntensity) * CONSTANTS.agoutiFactor * CONSTANTS.sepiaLightFactor);
        expect(settings[2]).toBe(0);
        expect(settings[3]).toBe(0);
    });
});
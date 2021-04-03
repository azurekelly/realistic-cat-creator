import {getEumelaninAbsorption, getPheomelaninAbsorption, simulateMelanin} from '../catColors';

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
        const melaninRgb = simulateMelanin('eumelanin', 400, 0);
        const expectedRgb = [72.151, 43.213, 30.712];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });
    it('returns expected rgb color for diluted eumelanin', () => {
        const melaninRgb = simulateMelanin('eumelanin', 500, 0.4);
        const expectedRgb = [136.126, 123.782, 120.098];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });
    it('returns expected rgb color for undiluted pheomelanin', () => {
        const melaninRgb = simulateMelanin('pheomelanin', 250, 0);
        const expectedRgb = [182.744, 114.882, 56.876];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });
    it('returns expected rgb color for diluted pheomelanin', () => {
        const melaninRgb = simulateMelanin('pheomelanin', 350, 0.6);
        const expectedRgb = [214.773, 186.866, 169.370];
        melaninRgb.forEach((x, i) => {
            expect(melaninRgb[i]).toBeCloseTo(expectedRgb[i]);
        });
    });
})
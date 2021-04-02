import {blendAlpha, hexToRgb, rgbToHex} from '../color-utils';

describe('hexToRgb', () => {
    it('converts format #ffffff to rgb array', () => {
        expect(hexToRgb('#ff8800')).toEqual([255, 136, 0]);
    });
    it('works without # symbol prefix', () => {
        expect(hexToRgb('1155bb')).toEqual([17, 85, 187]);
    });
    it('ignores leading and trailing whitespace', () => {
        expect(hexToRgb('   #123456   ')).toEqual([18, 52, 86]);
    });
    it('is not case sensitive', () => {
        expect(hexToRgb('#AbcDeF')).toEqual([171, 205, 239]);
    });
    it('converts format #fff to rgb array', () => {
        expect(hexToRgb('#a5f')).toEqual([170, 85, 255]);
    });
});

describe('rgbToHex', () => {
    it('converts [r, g, b] format to hex code', () => {
        expect(rgbToHex([17, 85, 187])).toBe('#1155bb');
    });
    it('adds leading 0s to component numbers < 16', () => {
        expect(rgbToHex([0, 8, 15])).toBe('#00080f');
    });
    it('limits values per component between 0 and 255', () => {
        expect(rgbToHex([-255, 500, 100])).toBe('#00ff64');
    });
    it('rounds values of components to integers', () => {
        expect(rgbToHex([100.3, 2.6, 210.777])).toBe('#6403d3');
    });
});

describe('blendAlpha', () => {
    it('blends alpha of 2 rgb colors', () => {
        // float values are ok, it would be rounded when it converts back to hex
        // rounding at this stage could cause issues with multiple passes of alpha blending
        expect(blendAlpha([255, 0, 12], [0, 128, 0], 0.5)).toEqual([127.5, 64, 6]);
        expect(blendAlpha([24, 0, 200], [2, 50, 32], 0.25)).toEqual([18.5, 12.5, 158]);
        expect(blendAlpha([6, 4, 130], [16, 100, 245], 0.75)).toEqual([13.5, 76, 216.25]);
    });
    it('returns the bottom color with a 0 alpha', () => {
        expect(blendAlpha([255, 0, 12], [0, 128, 0], 0)).toEqual([255, 0, 12]);
    });
    it('returns the top color with a 1 alpha', () => {
        expect(blendAlpha([255, 0, 12], [0, 128, 0], 1)).toEqual([0, 128, 0]);
    });
});
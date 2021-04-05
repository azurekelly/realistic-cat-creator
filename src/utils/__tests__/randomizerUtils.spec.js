import {pickRandomInt, pickRandomFromArray, pickRandomBool, pickRandomWeighted} from '../randomizerUtils';

describe('pickRandomInt', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('can pick min value', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
        expect(pickRandomInt(5, 10)).toBe(5);
    });

    it('can pick max value', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        expect(pickRandomInt(0, 4)).toBe(4);
    });

    it('can pick mid-range value', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        expect(pickRandomInt(8, 12)).toBe(10);
    });
});

describe('pickRandomFromArray', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('can pick first item', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        expect(pickRandomFromArray(['a', 'b', 'c', 'd', 'e'])).toBe('e');
    });

    it('can pick last item', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
        expect(pickRandomFromArray(['a', 'b', 'c', 'd', 'e'])).toBe('a');
    });

    it('can pick a middle item', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        expect(pickRandomFromArray(['a', 'b', 'c', 'd', 'e'])).toBe('c');
    });
});

describe('pickRandomBool', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('can pick true', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        expect(pickRandomBool()).toBe(true);
    });

    it('can pick false', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
        expect(pickRandomBool()).toBe(false);
    });
});

describe('pickRandomWeighted', () => {
    it('selects element with correct distribution', () => {
        let randomValue = 0;
        const mockRandom = jest.fn(min => {
            const result = min + randomValue;
            randomValue++;
            return result;
        });
        const expectedResults = ['a', 'a', 'b', 'c', 'c', 'c'];
        const actualResults = [];

        expectedResults.forEach(() => {
            actualResults.push(pickRandomWeighted([['a', 2], ['b', 1], ['c', 3]], mockRandom));
        });

        expect(actualResults).toEqual(expectedResults);
    });
});
import {loadImage, mapTraitToRange, pickRandomInt, pickRandomFromArray, pickRandomBool} from '../utils';

describe('loadImage', () => {
    it('resolves promise when image loads', () => {
        const mockImage = jest.spyOn(window, 'Image').mockImplementation(function() {
            this.addEventListener = (type, callback) => {
                if(type === 'load') {
                    callback();
                }
            };
        });

        expect.assertions(1);
        expect(loadImage('img/src')).resolves.toBeInstanceOf(mockImage);

        jest.restoreAllMocks();
    });

    it('returns an image with the correct src', done => {
        jest.spyOn(window, 'Image').mockImplementation(function() {
            this.addEventListener = (type, callback) => {
                if(type === 'load') {
                    callback();
                }
            };
        });
        expect.assertions(1);
        loadImage('img/src').then(img => {
            expect(img.src).toBe('img/src');
            done();
        });
    });

    it('throws error if image cannot load', () => {
        jest.spyOn(window, 'Image').mockImplementation(function() {
            this.addEventListener = (type, callback) => {
                if(type === 'error') {
                    callback(new Error('Image failed to load'));
                }
            };
        });

        expect.assertions(1);
        expect(loadImage('invalid/img')).rejects.toMatchObject({message: 'Image failed to load'});

        jest.restoreAllMocks();
    });
});

describe('mapTraitToRange', () => {
    it('maps a range to another range', () => {
        expect(mapTraitToRange(5, 0, 1)).toBeCloseTo(0.3125);
    });

    it('works with non-zero minimum values', () => {
        expect(mapTraitToRange(8, 20, 30)).toBe(25);
    });
});

describe('pickRandomInt', () => {
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
    it('can pick true', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.9999);
        expect(pickRandomBool()).toBe(true);
    });

    it('can pick false', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.01);
        expect(pickRandomBool()).toBe(false);
    });
});
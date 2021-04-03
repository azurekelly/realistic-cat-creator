import {loadImage, mapRange} from '../utils';

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

describe('mapRange', () => {
    it('maps a range to another range', () => {
        expect(mapRange(5, 0, 16, 0, 1)).toBeCloseTo(0.3125);
    });

    it('works with non-zero minimum values', () => {
        expect(mapRange(15, 10, 20, 20, 30)).toBe(25);
    });

    it('does not clamp values less than lower boundary', () => {
        expect(mapRange(3, 10, 20, 150, 300)).toBe(45);
    });

    it('does not clamp values higher than upper boundary', () => {
        expect(mapRange(90, 30, 60, 20, 40)).toBe(60);
    });
});
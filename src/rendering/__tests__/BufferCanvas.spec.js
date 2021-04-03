import BufferCanvas from '../BufferCanvas';

describe('BufferCanvas', () => {
    it('creates canvas with the correct width and height', () => {
        const buffer = new BufferCanvas(100, 200);
        expect(buffer.width).toBe(100);
        expect(buffer.height).toBe(200);
        expect(buffer.canvas.width).toBe(100);
        expect(buffer.canvas.height).toBe(200);
    });
    // TODO figure out an alternative way to mocking canvas calls to test drawing functions
});
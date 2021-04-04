// creates a new image element and wraps the load event in a promise
export const loadImage = src => (
    new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', err => reject(err));
        img.src = src;
    })
);

export const mapTraitToRange = (value, targetMin, targetMax) => {
    const traitRange = 16; // trait range is 0-16
    const targetRange = targetMax - targetMin;
    return value / traitRange * targetRange + targetMin;
};
// creates a new image element and wraps the load event in a promise
export const loadImage = src => (
    new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', err => reject(err));
        img.src = src;
    })
);

export const mapRange = (value, currMin, currMax, targetMin, targetMax) => {
    const currentRange = currMax - currMin;
    const targetRange = targetMax - targetMin;
    const relativeValue = value - currMin;
    return relativeValue / currentRange * targetRange + targetMin;
};
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

// between min and max both inclusive
export const pickRandomInt = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export const pickRandomFromArray = arr => arr[pickRandomInt(0, arr.length - 1)];

export const pickRandomBool = () => (pickRandomInt(0, 1) === 1);
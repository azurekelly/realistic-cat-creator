export const hexToRgb = hex => {
    const splitHex = hex.trim().split('#');
    // gets everything after the #, regardless of whether there is one or not
    const cleanHex = splitHex[splitHex.length - 1];
    let hexComponents;

    if(cleanHex.length === 3) { // expands #fff format into full 6 digits
        hexComponents = cleanHex.split('').map(component => component + component);
    }
    else {
        hexComponents = cleanHex.match(/.{2}/g);
    }
    return hexComponents.map(component => parseInt(component, 16));
};

export const rgbToHex = rgb => {
    const hexComponents = rgb.map(component => {
        const minMaxedComponent = component < 0 ? 0 : (component > 255 ? 255 : component);
        let hexComponent = Math.round(minMaxedComponent).toString(16);
        if(component < 16) {
            hexComponent = '0' + hexComponent;
        }
        return hexComponent;
    });
    return `#${hexComponents.join('')}`;
};

export const blendAlpha = (bottomColor, topColor, alpha) => (
    bottomColor.map((x, i) => bottomColor[i] * (1 - alpha) + topColor[i] * alpha)
);
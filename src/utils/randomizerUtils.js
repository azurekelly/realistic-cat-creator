// between min and max both inclusive
export const pickRandomInt = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export const pickRandomFromArray = arr => arr[pickRandomInt(0, arr.length - 1)];

export const pickRandomBool = () => (pickRandomInt(0, 1) === 1);

// options should be an array, with each element being an array with two elements: [value, weight]
// weights should be positive integers
export const pickRandomWeighted = (options, randomInt = pickRandomInt) => {
    const sumWeights = options.reduce((acc, curr) => acc + curr[1], 0);
    const rng = randomInt(1, sumWeights);
    let result;

    for(let i = 0, currentSum = 0; i < options.length; i++) {
        result = options[i][0];
        currentSum += options[i][1];
        if(rng <= currentSum) {
            break;
        }
    }
    return result;
};

export const generateRandomCat = () => ({
    baseColor: pickRandomWeighted([
        ['black', 4],
        ['chocolate', 3],
        ['cinnamon', 2],
        ['red', 4]
    ]),
    dilute: pickRandomWeighted([[true, 1], [false, 2]]),
    fullWhite: pickRandomWeighted([[true, 1], [false, 9]]),
    redness: pickRandomInt(0, 16),
    dilution: pickRandomInt(0, 16),
    tabby: pickRandomBool(),
    tortie: pickRandomBool(),
    pattern: pickRandomWeighted([
        ['mackerel', 3],
        ['classic', 3],
        ['spotted', 2],
        ['ticked', 2],
        ['rosette', 1],
        ['marble', 1],
        ['shaded', 1],
        ['tipped', 1]
    ]),
    patternContrast: pickRandomInt(0, 16),
    silver: pickRandomWeighted([[true, 1], [false, 4]]),
    whiteSpread: pickRandomWeighted([[0, 3], [pickRandomInt(1, 16), 1]]),
    point: pickRandomWeighted([
        ['standard', 15],
        ['point', 4],
        ['mink', 1],
        ['sepia', 1]
    ]),
    eyePigment: pickRandomInt(0, 16),
    blueRefraction: pickRandomInt(0, 16),
    eyeColorBase: pickRandomFromArray(['standard', 'aqua', 'blue'])
});
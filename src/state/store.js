import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const initialState = {
    cat: {
        baseColor: 'black',
        dilute: false,
        fullWhite: false,
        redness: 8, // visible on red-based cats, torties, and non-red tabbies
        dilution: 8, // only visible on dilutes
        baseMarking: 'solid', // can be solid, tabby, tortie, or torbie
        pattern: 'mackerel', // only visible on non-solids, can be many options
        patternContrast: 8,
        silver: 'standard',
        whiteSpread: 0,
        point: 'standard',
        eyePigment: 8,
        blueRefraction: 8,
        eyeColorBase: 'standard' // can be standard, aqua, or blue
    }
};

export const store = createStore(
    rootReducer,
    initialState,
    devToolsEnhancer()
);

export default store;
// TYPES
export const UPDATE_CAT = 'UPDATE_CAT';

// ACTIONS
// trait can be a single trait or the entirety of the cat's phenotype, it just gets merged with the existing phenotype
export const updateCat = traits => ({
    type: UPDATE_CAT,
    payload: traits
});

// SELECTORS
export const catSelector = state => state.cat;

// REDUCERS
const catReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_CAT:
            return {...state, ...action.payload}
        default:
            return state;
    }
};
export default catReducer;
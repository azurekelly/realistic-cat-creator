import {createStore, combineReducers} from 'redux';
import catReducer, {updateCat, catSelector} from './catState';

describe('catState', () => {
    const createMockStore = (defaultState = {}) => {
        const reducer = combineReducers({cat: catReducer});
        return createStore(reducer, defaultState);
    }

    it('updates single trait on cat', () => {
        // note: this testing is not dependant on the cat's structure
        // the property in this test may not even be a real one, the functionality of the actions do not depend on it
        const store = createMockStore({cat: {baseColor: 'red'}});
        store.dispatch(updateCat({baseColor: 'black'}));
        const cat = catSelector(store.getState());
        expect(cat.baseColor).toBe('black');
    });
    it('updates multiple traits on cat', () => {
        const store = createMockStore({cat: {baseColor: 'chocolate', eyeColor:'copper', tabbyType:'mackerel'}});
        store.dispatch(updateCat({baseColor: 'cinnamon', eyeColor:'green'}));
        const cat = catSelector(store.getState());
        expect(cat).toEqual({baseColor: 'cinnamon', eyeColor:'green', tabbyType: 'mackerel'});
    });
});
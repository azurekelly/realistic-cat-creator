import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatDescription, {getDescription} from '../CatDescription';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../state/rootReducer';
import {initialState} from '../../state/store';


const createCat = state => ({...initialState.cat, ...state});

// Bulk of the testing done on the helper method, for ease of testing multiple state values per test
describe('getDescription', () => {
    it('adds base color', () => {
        expect(getDescription(createCat({baseColor: 'black'}))).toBe('Black');
        expect(getDescription(createCat({baseColor: 'chocolate'}))).toBe('Chocolate');
        expect(getDescription(createCat({baseColor: 'cinnamon'}))).toBe('Cinnamon');
        expect(getDescription(createCat({baseColor: 'black', dilute: true}))).toBe('Blue');
        expect(getDescription(createCat({baseColor: 'chocolate', dilute: true}))).toBe('Lilac');
        expect(getDescription(createCat({baseColor: 'cinnamon', dilute: true}))).toBe('Fawn');
    });

    it('adds pattern description for tabbies and torbies', () => {
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'mackerel'}))).toBe('Chocolate mackerel tabby');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'classic'}))).toBe('Chocolate classic tabby');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'spotted'}))).toBe('Chocolate spotted tabby');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'ticked'}))).toBe('Chocolate ticked tabby');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'rosette'}))).toBe('Chocolate rosette tabby');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'marble'}))).toBe('Chocolate marble tabby');
        // shaded and tipped skipped here because they're a special case
    });

    it('replaces base color with brown for black tabbies', () => {
        expect(getDescription(createCat({baseColor: 'black', tabby: true}))).toBe('Brown mackerel tabby');
    });

    it('adds tabby description for reds even if the underlying marking type is solid', () => {
        expect(getDescription(createCat({baseColor: 'red', tabby: false}))).toBe('Red mackerel tabby');
        expect(getDescription(createCat({baseColor: 'red', dilute: true, tabby: false}))).toBe('Cream mackerel tabby');
    });

    it('places pattern in different location for tortie than for torbie', () => {
        expect(getDescription(createCat({tortie: true}))).toBe('Black tortie with mackerel markings');
        expect(getDescription(createCat({tabby: true, tortie: true}))).toBe('Brown mackerel torbie');
    });


    it('does not include tortie or torbie description for red cats', () => {
        expect(getDescription(createCat({baseColor: 'red', tabby: false, tortie: true}))).toBe('Red mackerel tabby');
        expect(getDescription(createCat({baseColor: 'red', tabby: true, tortie: true}))).toBe('Red mackerel tabby');
    });

    it('adds silver modifier for tabbies and torbies', () => {
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, silver: true}))).toBe('Chocolate silver mackerel tabby');
        expect(getDescription(createCat({baseColor: 'cinnamon', tabby: true, silver: true}))).toBe('Cinnamon silver mackerel tabby');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, tortie: true, silver: true}))).toBe('Chocolate silver mackerel torbie');
    });

    it('replaces base color with silver for black silver tabbies', () => {
        expect(getDescription(createCat({baseColor: 'black', tabby: true, silver: true}))).toBe('Silver mackerel tabby');
        expect(getDescription(createCat({baseColor: 'black', tabby: true, tortie: true, silver: true}))).toBe('Silver mackerel torbie');
    });

    it('adds smoke modifier for silver solids and torties', () => {
        expect(getDescription(createCat({baseColor: 'black', silver: true}))).toBe('Black smoke');
        expect(getDescription(createCat({baseColor: 'chocolate', silver: true}))).toBe('Chocolate smoke');
        expect(getDescription(createCat({baseColor: 'black', tortie: true, silver: true}))).toBe('Black smoke tortie with mackerel markings');
    });

    it('adds silver rather than smoke for "solid" red cats', () => {
        expect(getDescription(createCat({baseColor: 'red', tabby: false, silver: true}))).toBe('Red silver mackerel tabby');
        expect(getDescription(createCat({baseColor: 'red', dilute: true, tabby: false, silver: true}))).toBe('Cream silver mackerel tabby');
    });

    it('handles special case of shaded or tipped goldens and silvers', () => {
        expect(getDescription(createCat({tabby: true, pattern: 'shaded'}))).toBe('Golden shaded');
        expect(getDescription(createCat({tabby: true, pattern: 'tipped'}))).toBe('Golden tipped');
        expect(getDescription(createCat({tabby: true, pattern: 'shaded', silver: true}))).toBe('Silver shaded');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, pattern: 'shaded'}))).toBe('Chocolate golden shaded');
        expect(getDescription(createCat({baseColor: 'chocolate', tortie: true, pattern: 'shaded'}))).toBe('Chocolate golden shaded tortie');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, tortie: true, pattern: 'shaded'}))).toBe('Chocolate golden shaded torbie');
        expect(getDescription(createCat({baseColor: 'black', tabby: false, tortie: true, pattern: 'shaded'}))).toBe('Golden shaded tortie');
        expect(getDescription(createCat({baseColor: 'red', tabby: false, pattern: 'shaded'}))).toBe('Red golden shaded');
        expect(getDescription(createCat({tabby: false, pattern: 'shaded'}))).toBe('Black');
    });

    it('skips all other description for solid white', () => {
        expect(getDescription(createCat({fullWhite: true, baseColor: 'chocolate', tabby: true, tortie: true}))).toBe('White');
    });

    it('adds bicolor for various white levels', () => {
        expect(getDescription(createCat({whiteSpread: 1}))).toBe('Black bicolor');
        expect(getDescription(createCat({baseColor: 'red', pattern: 'classic', whiteSpread: 16}))).toBe('Red classic tabby bicolor');
        expect(getDescription(createCat({tabby: true, tortie: true, whiteSpread: 8}))).toBe('Brown mackerel torbie bicolor');
        expect(getDescription(createCat({baseColor: 'chocolate', tortie: true, pattern: 'classic', whiteSpread: 8}))).toBe('Chocolate tortie bicolor with classic markings');
    });

    it('adds point, mink, and sepia modifiers', () => {
        expect(getDescription(createCat({point: 'point'}))).toBe('Seal point');
        expect(getDescription(createCat({point: 'mink'}))).toBe('Seal mink');
        expect(getDescription(createCat({point: 'sepia'}))).toBe('Seal sepia');
        expect(getDescription(createCat({baseColor: 'chocolate', tabby: true, point: 'point'}))).toBe('Chocolate mackerel tabby point');
        expect(getDescription(createCat({baseColor: 'red', point: 'point', silver: true, point: 'point'}))).toBe('Red silver mackerel tabby point');
        expect(getDescription(createCat({baseColor: 'cinnamon', tortie: true, whiteSpread: 8, point: 'point'}))).toBe('Cinnamon tortie point bicolor with mackerel markings');
    });
});

describe('CatDescription component', () => {
    it('displays description for cat state', () => {
        const store = createStore(reducer, {
            ...initialState,
            cat: createCat({
                baseColor: 'chocolate',
                dilute: true,
                tabby: true,
                tortie: true,
                point: 'mink',
                whiteSpread: 4
            })
        });
        render(<Provider store={store}><CatDescription /></Provider>);
        expect(screen.getByText('Lilac mackerel torbie mink bicolor')).toBeInTheDocument();
    });
});
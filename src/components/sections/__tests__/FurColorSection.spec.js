import FurColorSection from '../FurColorSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {catSelector} from '../../../state/catState';
import reducer from '../../../state/rootReducer';
import {initialState as storeState} from '../../../state/store';

const renderComponent = (state = {}) => {
    const cat = {...storeState.cat, ...state.cat};
    const store = createStore(reducer, {...storeState, ...state, cat});
    const view = render(<Provider store={store}><FurColorSection /></Provider>);
    return {store, view};
};

const buttons = [
    ['Black', {baseColor: 'black', dilute: false, fullWhite: false}, {baseColor: '', dilute: true, fullWhite: true}],
    ['Chocolate', {baseColor: 'chocolate', dilute: false, fullWhite: false}, {baseColor: '', dilute: true, fullWhite: true}],
    ['Cinnamon', {baseColor: 'cinnamon', dilute: false, fullWhite: false}, {baseColor: '', dilute: true, fullWhite: true}],
    ['Red', {baseColor: 'red', dilute: false, fullWhite: false}, {baseColor: '', dilute: true, fullWhite: true}],
    ['Gray', {baseColor: 'black', dilute: true, fullWhite: false}, {baseColor: '', dilute: false, fullWhite: true}],
    ['Lilac', {baseColor: 'chocolate', dilute: true, fullWhite: false}, {baseColor: '', dilute: false, fullWhite: true}],
    ['Fawn', {baseColor: 'cinnamon', dilute: true, fullWhite: false}, {baseColor: '', dilute: false, fullWhite: true}],
    ['Cream', {baseColor: 'red', dilute: true, fullWhite: false}, {baseColor: '', dilute: false, fullWhite: true}],
    ['White', {fullWhite: true}, {fullWhite: false}]
];
const sliders = [
    ['Redness', state => catSelector(state).redness],
    ['Dilution', state => catSelector(state).dilution]
];

describe('FurColorSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByText('Fur color')).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState, initialState) => {
        const {store} = renderComponent({cat: initialState});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(catSelector(store.getState())).toMatchObject(expectedState);
    });

    it.each(sliders)('has functioning %s slider', (slider, targetState) => {
        const {store} = renderComponent({cat: {redness: 8, dilution: 8}});
        fireEvent.change(screen.getByRole('slider', {name: slider}), {target: {value: 1}});
        expect(targetState(store.getState())).toBe(1);
    });

    it('enables red slider for red cats', () => {
        renderComponent({cat: {baseColor: 'red', redness: 8, dilution: 8}});
        expect(screen.getByRole('slider', {name: 'Redness'})).not.toBeDisabled();
    });

    it('disables red slider for non-red cats', () => {
        renderComponent({cat: {baseColor: 'black', redness: 8, dilution: 8}});
        expect(screen.getByRole('slider', {name: 'Redness'})).toBeDisabled();
    });

    it('enables dilute slider for dilute cats', () => {
        renderComponent({cat: {dilute: true, dilution: 8}});
        expect(screen.getByRole('slider', {name: 'Dilution'})).not.toBeDisabled();
    });

    it('disables dilute slider for non-dilute cats', () => {
        renderComponent({cat: {dilute: false, dilution: 8}});
        expect(screen.getByRole('slider', {name: 'Dilution'})).toBeDisabled();
    });

    it('disables both sliders for full white cats', () => {
        renderComponent({cat: {fullWhite: true, dilute: true, baseColor: 'red'}});
        expect(screen.getByRole('slider', {name: 'Redness'})).toBeDisabled();
        expect(screen.getByRole('slider', {name: 'Dilution'})).toBeDisabled();
    });
});
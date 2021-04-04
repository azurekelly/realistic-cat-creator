import FurColorSection from '../FurColorSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';
import {catSelector} from '../../../state/catState';

const buttons = [
    ['Black', {baseColor: 'black', dilute: false, fullWhite: false}],
    ['Chocolate', {baseColor: 'chocolate', dilute: false, fullWhite: false}],
    ['Cinnamon', {baseColor: 'cinnamon', dilute: false, fullWhite: false}],
    ['Red', {baseColor: 'red', dilute: false, fullWhite: false}],
    ['Gray', {baseColor: 'black', dilute: true, fullWhite: false}],
    ['Lilac', {baseColor: 'chocolate', dilute: true, fullWhite: false}],
    ['Fawn', {baseColor: 'cinnamon', dilute: true, fullWhite: false}],
    ['Cream', {baseColor: 'red', dilute: true, fullWhite: false}],
    ['White', {fullWhite: true}]
];
const sliders = [
    ['Redness', state => catSelector(state).redness],
    ['Dilution', state => catSelector(state).dilution]
];

const renderComponent = (initialState = {}) => {
    const store = createStore(reducer, initialState);
    const view = render(<Provider store={store}><FurColorSection /></Provider>);
    return {store, view};
};

describe('FurColorSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByText('Fur color')).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {baseColor: '', dilution: null, fullWhite: null}});
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
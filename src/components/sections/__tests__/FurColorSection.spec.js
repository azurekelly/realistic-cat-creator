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

// TODO add in tests related to disabling sliders based on current state
describe('FurColorSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByText('Fur color')).toBeInTheDocument();
    });

    it('contains correct buttons', () => {
        renderComponent();
        buttons.forEach(button => {
            // getByRole was being too slow for looping, jest sometimes timed out
            expect(screen.getByText(button[0])).toBeInTheDocument();
        });
    });

    it.each(buttons)('updates state when %s button clicked', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {baseColor: '', dilution: null, fullWhite: null}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(catSelector(store.getState())).toMatchObject(expectedState);
    });

    it('has an advanced section', () => {
        renderComponent();
        expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    it('displays correct sliders when advanced section is expanded', () => {
        renderComponent();
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        sliders.forEach(([slider]) => {
            // getByRole was being too slow for looping, jest sometimes timed out
            expect(screen.getByLabelText(slider)).toBeInTheDocument();
        });
    });

    it.each(sliders)('updates state when %s slider is changed', (slider, targetState) => {
        const {store} = renderComponent({cat: {redness: 8, dilution: 8}});
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        fireEvent.change(screen.getByRole('slider', {name: slider}), {target: {value: 1}});
        expect(targetState(store.getState())).toBe(1);
    });
});
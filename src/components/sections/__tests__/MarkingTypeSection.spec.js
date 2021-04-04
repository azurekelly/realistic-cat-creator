import MarkingTypeSection from '../MarkingTypeSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';
import { renderIntoDocument } from 'react-dom/test-utils';

const renderComponent = (initialState = {}) => {
    const store = createStore(reducer, initialState);
    const view = render(<Provider store={store}><MarkingTypeSection /></Provider>);
    return {store, view};
};

const buttons = [
    ['Solid', {tabby: false, tortie: false}],
    ['Tabby', {tabby: true, tortie: false}],
    ['Tortie', {tabby: false, tortie: true}],
    ['Torbie', {tabby: true, tortie: true}]
];
const sliders = [
    ['Redness', state => state.cat.redness],
    ['Contrast', state => state.cat.patternContrast]
];

describe('MarkingTypeSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Marking type'})).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {tabby: null, tortie: null}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
    });

    it.each(sliders)('has functioning %s slider', (sliderName, stateSelector) => {
        const {store} = renderComponent({cat: {redness: 8, patternContrast: 8}});
        fireEvent.change(screen.getByRole('slider', {name: sliderName}), {target: {value: 1}});
        expect(stateSelector(store.getState())).toBe(1);
    });

    it('enables all buttons for non-red non-white cat', () => {
        renderComponent({cat: {baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).not.toBeDisabled();
        });
    });

    it('disables all buttons for full white', () => {
        renderComponent({cat: {baseColor: 'black', fullWhite: true}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).toBeDisabled();
        });
    });

    it('disables all buttons for red cat', () => {
        renderComponent({cat: {baseColor: 'red', fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).toBeDisabled();
        });
    });

    it('enables all sliders for tabby cat', () => {
        renderComponent({cat: {tabby: true, tortie: false, baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('slider').forEach(slider => {
            expect(slider).not.toBeDisabled();
        });
    });

    it('enables all sliders for tortie cat', () => {
        renderComponent({cat: {tabby: false, tortie: true, baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('slider').forEach(slider => {
            expect(slider).not.toBeDisabled();
        });
    });

    it('enables all sliders for red cat', () => {
        renderComponent({cat: {tabby: false, tortie: false, baseColor: 'red', fullWhite: false}});
        screen.getAllByRole('slider').forEach(slider => {
            expect(slider).not.toBeDisabled();
        });
    });

    it('disables all sliders for solid non-red cat', () => {
        renderComponent({cat: {tabby: false, tortie: false, baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('slider').forEach(slider => {
            expect(slider).toBeDisabled();
        });
    });

    it('disables all sliders for full white cat', () => {
        renderComponent({cat: {tabby: true, tortie: true, baseColor: 'red', fullWhite: true}});
        screen.getAllByRole('slider').forEach(slider => {
            expect(slider).toBeDisabled();
        });
    });

    it('enables redness slider for smoke cat', () => {
        renderComponent({cat: {tabby: false, tortie: false, baseColor: 'black', fullWhite: false, silver: true}});
        expect(screen.getByRole('slider', {name: 'Redness'})).not.toBeDisabled();
    });
});
import WhiteSection from '../WhiteSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';
import {initialState as storeState} from '../../../state/store';

const renderComponent = (state = {}) => {
    const cat = {...storeState.cat, ...state.cat};
    const store = createStore(reducer, {...storeState, ...state, cat});
    const view = render(<Provider store={store}><WhiteSection /></Provider>);
    return {store, view};
};

const buttons = [
    ['None', {whiteSpread: 0}],
    ['Low', {whiteSpread: 4}],
    ['Medium', {whiteSpread: 8}],
    ['High', {whiteSpread: 12}]
];

describe('WhiteSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'White markings'})).toBeInTheDocument();
    });

    it('has button section header', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Presets'})).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {whiteSpread: 1}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
    });

    it('has functioning spread slider', () => {
        const {store} = renderComponent({cat: {whiteSpread: 8}});
        fireEvent.change(screen.getByRole('slider', {name: 'Spread'}), {target: {value: 1}});
        expect(store.getState().cat.whiteSpread).toBe(1);
    });

    it('enables all buttons for non-white cat', () => {
        renderComponent({cat: {fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).not.toBeDisabled();
        });
    });

    it('disables all buttons for white cat', () => {
        renderComponent({cat: {fullWhite: true}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).toBeDisabled();
        });
    });
});
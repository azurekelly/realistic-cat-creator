import WhiteSection from '../WhiteSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';

const renderComponent = (initialState = {}) => {
    const store = createStore(reducer, initialState);
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
    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {whiteSpread: null}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
    });
    it('has functioning spread slider', () => {
        const {store} = renderComponent({cat: {whiteSpread: 8}});
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        fireEvent.change(screen.getByRole('slider', {name: 'Spread'}), {target: {value: 1}});
        expect(store.getState().cat.whiteSpread).toBe(1);
    });
});
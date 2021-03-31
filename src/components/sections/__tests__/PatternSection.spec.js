import PatternSection from '../PatternSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';

const renderComponent = (initialState = {}) => {
    const store = createStore(reducer, initialState);
    const view = render(<Provider store={store}><PatternSection /></Provider>);
    return {store, view};
};

// TODO handle odd cases with smoke, possibly requiring a state shape change
const buttons = [
    ['Mackerel', {pattern: 'mackerel'}],
    ['Classic', {pattern: 'classic'}],
    ['Spotted', {pattern: 'spotted'}],
    ['Ticked', {pattern: 'ticked'}],
    ['Rosette', {pattern: 'rosette'}],
    ['Marble', {pattern: 'marble'}],
    ['Smoke', {pattern: 'smoke'}],
    ['Shaded', {pattern: 'shaded'}],
    ['Tipped', {pattern: 'tipped'}]
];

describe('PatternSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Pattern'})).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {pattern: null}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
    });

    it('has functioning pattern spread slider', () => {
        const {store} = renderComponent({cat: {patternSpread: 8}});
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        fireEvent.change(screen.getByRole('slider', {name: 'Spread'}), {target: {value: 1}});
        expect(store.getState().cat.patternSpread).toBe(1);
    });
});
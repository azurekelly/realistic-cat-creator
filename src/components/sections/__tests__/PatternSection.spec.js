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

const buttons = [
    ['Mackerel', {pattern: 'mackerel'}],
    ['Classic', {pattern: 'classic'}],
    ['Spotted', {pattern: 'spotted'}],
    ['Ticked', {pattern: 'ticked'}],
    ['Rosette', {pattern: 'rosette'}],
    ['Marble', {pattern: 'marble'}],
    ['Shaded', {pattern: 'shaded'}],
    ['Tipped', {pattern: 'tipped'}]
];

describe('PatternSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Pattern'})).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {tabby: true, pattern: null}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
    });

    it('enable all buttons for tabby cat', () => {
        renderComponent({cat: {tabby: true, tortie: false, baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).not.toBeDisabled();
        });
    });

    it('enable all buttons for tortie cat', () => {
        renderComponent({cat: {tabby: false, tortie: true, baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).not.toBeDisabled();
        });
    });

    it('enable all buttons for red cat', () => {
        renderComponent({cat: {tabby: false, tortie: false, baseColor: 'red', fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).not.toBeDisabled();
        });
    });

    it('disable all buttons for solid non-red cat', () => {
        renderComponent({cat: {tabby: false, tortie: false, baseColor: 'black', fullWhite: false}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).toBeDisabled();
        });
    });

    it('disable all buttons for full white cat', () => {
        renderComponent({cat: {tabby: true, tortie: true, baseColor: 'red', fullWhite: true}});
        screen.getAllByRole('button').forEach(button => {
            expect(button).toBeDisabled();
        });
    });
});
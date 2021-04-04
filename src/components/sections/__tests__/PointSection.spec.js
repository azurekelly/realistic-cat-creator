import PointSection from '../PointSection';
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
    const view = render(<Provider store={store}><PointSection /></Provider>);
    return {store, view};
};

const buttons = [
    ['Standard', {point: 'standard'}, {point: 'point'}],
    ['Point', {point: 'point'}, {point: 'standard'}],
    ['Mink', {point: 'mink'}, {point: 'standard'}],
    ['Sepia', {point: 'sepia'}, {point: 'standard'}]
];

describe('PointSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Colorpoint'})).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState, initialState) => {
        const {store} = renderComponent({cat: initialState});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
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
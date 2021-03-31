import PointSection from '../PointSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';

const renderComponent = (initialState = {}) => {
    const store = createStore(reducer, initialState);
    const view = render(<Provider store={store}><PointSection /></Provider>);
    return {store, view};
};

const buttons = [
    ['Standard', {point: 'standard'}],
    ['Point', {point: 'point'}],
    ['Mink', {point: 'mink'}],
    ['Sepia', {point: 'sepia'}]
];

describe('PointSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Colorpoint'})).toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {point: null}});
        userEvent.click(screen.getByRole('button', {name: buttonName}));
        expect(store.getState().cat).toMatchObject(expectedState);
    });

    it('has functioning temperature slider', () => {
        const {store} = renderComponent({cat: {pointTemp: 8}});
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        fireEvent.change(screen.getByRole('slider', {name: 'Temperature'}), {target: {value: 1}});
        expect(store.getState().cat.pointTemp).toBe(1);
    });
});
import SilverSection from '../SilverSection';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';

const renderComponent = (initialState = {}) => {
    const store = createStore(reducer, initialState);
    const view = render(<Provider store={store}><SilverSection /></Provider>);
    return {store, view};
};

const buttons = [
    ['Standard', {silver: false}],
    ['Silver', {silver: true}]
];

describe('SilverSection component', () => {
    it('has section heading', () => {
        renderComponent();
        expect(screen.getByRole('heading', {name: 'Silver'})).toBeInTheDocument();
    });

    it('does not have advanced section', () => {
        renderComponent();
        expect(screen.queryByRole('button', {name: 'Advanced'})).not.toBeInTheDocument();
    });

    it.each(buttons)('has functioning %s button', (buttonName, expectedState) => {
        const {store} = renderComponent({cat: {silver: null}});
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
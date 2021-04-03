import MarkingTypeSection from '../MarkingTypeSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../../state/rootReducer';

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
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        fireEvent.change(screen.getByRole('slider', {name: sliderName}), {target: {value: 1}});
        expect(stateSelector(store.getState())).toBe(1);
    });
});
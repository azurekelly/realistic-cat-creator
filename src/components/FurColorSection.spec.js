import FurColorSection from './FurColorSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'

const buttons = ['Black', 'Chocolate', 'Cinnamon', 'Red', 'Gray', 'Lilac', 'Fawn', 'Cream'];
const sliders = ['Pigment intensity', 'Eumelanin color', 'Dilution'];

// TODO add in tests related to disabling sliders based on current state
describe('FurColorSection component', () => {
    it('has section heading', () => {
        render(<FurColorSection />);
        expect(screen.getByRole('heading', {name: 'Fur color'})).toBeInTheDocument();
    });

    it.each(buttons)('contains %s button', color => {
        render(<FurColorSection />);
        expect(screen.getByRole('button', {name: color})).toBeInTheDocument();
    });

    it.todo('updates state on button click'); // each

    it('has an advanced section button', () => {
        render(<FurColorSection />);
        expect(screen.getByRole('button', {name: /advanced/i})).toBeInTheDocument();
    })

    it('has no sliders visible at start', () => {
        render(<FurColorSection />);
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    });

    it('displays sliders when advanced section is expanded', () => {
        render(<FurColorSection />);
        userEvent.click(screen.getByRole('button', {name: /advanced/i}));
        expect(screen.queryAllByRole('slider').length).toBe(3);
    });

    it.each(sliders)('contains %s slider', (slider) => {
        render(<FurColorSection />);
        userEvent.click(screen.getByRole('button', {name: /advanced/i}));
        expect(screen.getByRole('slider', {name: slider})).toBeInTheDocument();
    });

    it.each(sliders)('has correct min for %s slider', slider => {
        render(<FurColorSection />);
        userEvent.click(screen.getByRole('button', {name: /advanced/i}));
        fireEvent.change(screen.getByRole('slider', {name: slider}), {target: {value: -5}})
        // currently, all sliders have a fixed min of 0, so it's just hard coded in the test right now
        expect(screen.getByRole('slider', {name: slider})).toHaveValue('0'); 
    });

    it.each(sliders)('has correct max for %s slider', slider => {
        render(<FurColorSection />);
        userEvent.click(screen.getByRole('button', {name: /advanced/i}));
        fireEvent.change(screen.getByRole('slider', {name: slider}), {target: {value: 20}})
        // currently, all sliders have a fixed max of 16, so it's just hard coded in the test right now
        expect(screen.getByRole('slider', {name: slider})).toHaveValue('16'); 
    });

    it.todo('updates state on slider change'); // each
});
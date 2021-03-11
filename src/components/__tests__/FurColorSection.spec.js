import FurColorSection from '../FurColorSection';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'

const buttons = ['Black', 'Chocolate', 'Cinnamon', 'Red', 'Gray', 'Lilac', 'Fawn', 'Cream'];
const sliders = ['Pigment intensity', 'Eumelanin color', 'Dilution'];

// TODO add in tests related to disabling sliders based on current state
describe('FurColorSection component', () => {
    it('has section heading', () => {
        render(<FurColorSection />);
        expect(screen.getByText('Fur color')).toBeInTheDocument();
    });

    it('contains correct buttons', () => {
        render(<FurColorSection />);
        buttons.forEach(button => { 
            // getByRole was being too slow for looping, jest sometimes timed out
            expect(screen.getByText(button)).toBeInTheDocument();
        })
    });

    it.todo('updates state on button click'); // each

    it('has an advanced section', () => {
        render(<FurColorSection />);
        expect(screen.getByText('Advanced')).toBeInTheDocument();
    })

    it('displays sliders when advanced section is expanded', () => {
        render(<FurColorSection />);
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        expect(screen.queryAllByRole('slider').length).toBe(3);
    });

    it('contains correct sliders', () => {
        render(<FurColorSection />);
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        sliders.forEach(slider => {
            // getByRole was being too slow for looping, jest sometimes timed out
            expect(screen.getByText(slider)).toBeInTheDocument();
        })
    });

    it.todo('updates state on slider change'); // each
});
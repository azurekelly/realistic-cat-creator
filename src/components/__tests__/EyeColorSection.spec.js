import EyeColorSection from '../EyeColorSection';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'

const buttons = ['Copper', 'Orange', 'Yellow', 'Hazel', 'Green', 'Aqua', 'Blue'];
const sliders = ['Pigment intensity', 'Blue refraction'];

// TODO test for disabling aqua and blue based on pattern state
// TODO test for correct state changes on button or slider change
describe('EyeColorSection component', () => {
    it('has correct section title', () => {
        render(<EyeColorSection />);
        expect(screen.getByText('Eye color')).toBeInTheDocument();
    });

    it('contains correct buttons', () => {
        render(<EyeColorSection />);
        buttons.forEach(button => {
            expect(screen.getByText(button)).toBeInTheDocument();
        });
    });

    it('has an advanced section that is collapsed by default', () => {
        render(<EyeColorSection />);
        expect(screen.getByText('Advanced')).toBeInTheDocument();
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    });

    it('displays correct sliders when advanced section is expanded', () => {
        render(<EyeColorSection />);
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        sliders.forEach(slider => {
            expect(screen.getByLabelText(slider)).toBeInTheDocument();
        });
    });
});
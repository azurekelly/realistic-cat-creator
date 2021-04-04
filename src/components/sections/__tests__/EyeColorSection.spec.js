import EyeColorSection from '../EyeColorSection';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const buttons = ['Copper', 'Orange', 'Yellow', 'Hazel', 'Green', 'Aqua', 'Blue'];
const sliders = ['Pigment intensity', 'Blue refraction'];

// TODO test for disabling aqua and blue based on pattern state
// TODO test for correct state changes on button or slider change
describe('EyeColorSection component', () => {
    it('has section heading', () => {
        render(<EyeColorSection />);
        expect(screen.getByText('Eye color')).toBeInTheDocument();
    });

    it('contains correct buttons', () => {
        render(<EyeColorSection />);
        buttons.forEach(button => {
            expect(screen.getByText(button)).toBeInTheDocument();
        });
    });

    it('displays correct sliders when advanced section is expanded', () => {
        render(<EyeColorSection />);
        sliders.forEach(slider => {
            expect(screen.getByLabelText(slider)).toBeInTheDocument();
        });
    });
});
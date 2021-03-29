import AdvancedSection from '../AdvancedSection';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('AdvancedSection component', () => {
    it('has button/link for collapsing', () => {
        render(<AdvancedSection />);
        expect(screen.getByRole('button', {name: /advanced/i})).toBeInTheDocument();
    });

    it('renders children when default collapse state is set to false', () => {
        render(<AdvancedSection collapsed={false}><div data-testid='child'>Child element</div></AdvancedSection>);
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('does not render children when default collapse state is set to true', () => {
        render(<AdvancedSection collapsed={true}><div data-testid='child'>Child element</div></AdvancedSection>);
        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });

    it('is collapsed by default and does not render children', () => {
        render(<AdvancedSection><div data-testid='child'>Child element</div></AdvancedSection>);
        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });

    it('shows children when clicked if collapsed', () => {
        render(<AdvancedSection collapsed={true}><div data-testid='child'>Child element</div></AdvancedSection>);
        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
        userEvent.click(screen.getByRole('button', {name: /advanced/i}));
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('hides children when clicked if uncollapsed', () => {
        render(<AdvancedSection collapsed={false}><div data-testid='child'>Child element</div></AdvancedSection>);
        expect(screen.getByTestId('child')).toBeInTheDocument();
        userEvent.click(screen.getByRole('button', {name: /advanced/i}));
        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
});
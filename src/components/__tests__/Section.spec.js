import Section from '../Section';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Section component', () => {
    it('has section heading specified by props', () => {
        render(<Section title={'Section test'} />);
        expect(screen.getByRole('heading', {name: 'Section test'})).toBeInTheDocument();
    });

    it('displays buttons specified in props', () => {
        const buttons = [{label: 'Button test'}];
        render(<Section title='Section test' buttons={buttons} />);
        expect(screen.getByRole('button', {name: 'Button test'})).toBeInTheDocument();
    });

    it('calls callback onClick specified by button object in props', () => {
        const handleClick = jest.fn();
        const buttons = [{label: 'Button test', onClick: handleClick}];
        render(<Section title='Section test' buttons={buttons} />);
        userEvent.click(screen.getByRole('button', {name: 'Button test'}));
        expect(handleClick).toHaveBeenCalled();
    });

    it('displays advanced section if sliders passed in props', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        expect(screen.getByRole('button', {name: 'Advanced'})).toBeInTheDocument();
    });

    it('does not display advanced section if no sliders passed in props', () => {
        render(<Section title={'Section test'} />);
        expect(screen.queryByRole('button', {name: 'Advanced'})).not.toBeInTheDocument();
    });

    it('has advanced section collapsed by default', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        expect(screen.queryByRole('slider', {name: 'Slider test'})).not.toBeInTheDocument();
    });

    it('has advanced section expanded by default when specified by props', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} advancedCollapsed={false} />);
        expect(screen.getByRole('slider', {name: 'Slider test'})).toBeInTheDocument();
    });

    it('displays sliders passed in props when advanced section is manually expanded', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        userEvent.click(screen.getByRole('button', {name: 'Advanced'}));
        expect(screen.getByRole('slider', {name: 'Slider test'})).toBeInTheDocument();
    });

    it('has correct min value for slider', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} advancedCollapsed={false} />);
        fireEvent.change(screen.getByRole('slider', {name: 'Slider test'}), {target: {value: -5}});
        expect(screen.getByRole('slider', {name: 'Slider test'})).toHaveValue('0');
    });

    it('has correct max value for slider', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} advancedCollapsed={false} />);
        fireEvent.change(screen.getByRole('slider', {name: 'Slider test'}), {target: {value: 50}});
        expect(screen.getByRole('slider', {name: 'Slider test'})).toHaveValue('16');
    });

    it('has correct default value for slider', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} advancedCollapsed={false} />);
        expect(screen.getByRole('slider', {name: 'Slider test'})).toHaveValue('8');
    });

    it('calls callback onChange specified by slider object in props', () => {
        const handleChange = jest.fn();
        const sliders = [{label: 'Slider test', onChange: handleChange}];
        render(<Section title={'Section test'} sliders={sliders} advancedCollapsed={false} />);
        fireEvent.change(screen.getByRole('slider', {name: 'Slider test'}), {target: {value: 0}});
        expect(handleChange).toHaveBeenCalled();
    });
});
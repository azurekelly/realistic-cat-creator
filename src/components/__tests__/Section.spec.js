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

    it('displays sliders specified in props', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        expect(screen.getByRole('slider', {name: 'Slider test'})).toBeInTheDocument();
    });

    it('does not display sliders if none are passed', () => {
        render(<Section title={'Section test'} />);
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    });

    it('has correct min value for slider', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        fireEvent.change(screen.getByRole('slider', {name: 'Slider test'}), {target: {value: -5}});
        expect(screen.getByRole('slider', {name: 'Slider test'})).toHaveValue('0');
    });

    it('has correct max value for slider', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        fireEvent.change(screen.getByRole('slider', {name: 'Slider test'}), {target: {value: 50}});
        expect(screen.getByRole('slider', {name: 'Slider test'})).toHaveValue('16');
    });

    it('has correct default value for slider', () => {
        const sliders = [{label: 'Slider test'}];
        render(<Section title={'Section test'} sliders={sliders} />);
        expect(screen.getByRole('slider', {name: 'Slider test'})).toHaveValue('8');
    });

    it('calls callback onChange specified by slider object in props', () => {
        const handleChange = jest.fn();
        const sliders = [{label: 'Slider test', onChange: handleChange}];
        render(<Section title={'Section test'} sliders={sliders} />);
        fireEvent.change(screen.getByRole('slider', {name: 'Slider test'}), {target: {value: 0}});
        expect(handleChange).toHaveBeenCalled();
    });
});
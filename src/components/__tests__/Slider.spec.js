import Slider from '../Slider';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Slider component', () => {
    it('contains slider element', () => {
        render(<Slider />);
        expect(screen.getByRole('slider')).toBeInTheDocument();
    });
    it('contains number input element', () => {
        render(<Slider />);
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });
    it('contains label specified by props', () => {
        render(<Slider label='Slider label' />);
        expect(screen.getByRole('slider', {name: 'Slider label'})).toBeInTheDocument();
    });
    it('calls function when slider is changed', () => {
        const handleChange = jest.fn();
        render(<Slider onChange={handleChange} />);
        fireEvent.change(screen.getByRole('slider'), {target: {value: 1}});
        expect(handleChange).toHaveBeenCalled();
    });
    it('calls function when number input is changed', () => {
        const handleChange = jest.fn();
        render(<Slider onChange={handleChange} />);
        fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 1}});
        expect(handleChange).toHaveBeenCalled();
    });
    it('applies min to slider', () => {
        render(<Slider min={5} />);
        fireEvent.change(screen.getByRole('slider'), {target: {value: 1}});
        expect(screen.getByRole('slider')).toHaveValue('5');
    });
    it('applies max to slider', () => {
        render(<Slider max={10} />);
        fireEvent.change(screen.getByRole('slider'), {target: {value: 15}});
        expect(screen.getByRole('slider')).toHaveValue('10');
    });
    it('applies min to number input', () => {
        const handleChange = jest.fn();
        render(<Slider min={5} onChange={handleChange} />);
        fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 1}});
        expect(screen.getByRole('spinbutton')).toHaveValue(5);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            target: expect.objectContaining({value: '5'})
        }));
    });
    it('applies max to number input', () => {
        const handleChange = jest.fn();
        render(<Slider max={10} onChange={handleChange} />);
        fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 15}});
        expect(screen.getByRole('spinbutton')).toHaveValue(10);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            target: expect.objectContaining({value: '10'})
        }));
    });
});
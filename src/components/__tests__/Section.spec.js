import Section from '../Section';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Section component', () => {
    it('has section heading specified by props', () => {
        render(<Section title={'Section test'} />);
        expect(screen.getByRole('heading', {name: 'Section test'})).toBeInTheDocument();
    });

    it('displays button groups specified in props', () => {
        const buttonGroups = [
            {
                title: 'Button group 1',
                buttons: [{label: 'Group 1 button'}]
            },
            {
                title: 'Button group 2',
                buttons: [{label: 'Group 2 button 1'}, {label: 'Group 2 button 2'}]
            }
        ];
        render(<Section title='Section test' buttonGroups={buttonGroups} />);
        expect(screen.getByRole('heading', {name: 'Button group 1'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: 'Button group 2'})).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('allows button group to not have heading', () => {
        const buttonGroup = [{buttons: [{label: 'Button test'}]}];
        render(<Section title={'Section test'} buttonGroups={buttonGroup} />);
        expect(screen.getAllByRole('heading')).toHaveLength(1); // only section heading
    });

    it('calls callback onClick specified by button object in props', () => {
        const handleClick = jest.fn();
        const buttonGroup = [{buttons: [{label: 'Button test', onClick: handleClick}]}];
        render(<Section title='Section test' buttonGroups={buttonGroup} />);
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
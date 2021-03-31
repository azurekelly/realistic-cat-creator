import {useDispatch} from 'react-redux';
import Section from '../Section';
import {updateCat} from '../../state/catState';

const PointSection = () => {
    const dispatch = useDispatch();
    const buttons = [
        {label: 'Standard', onClick: () => dispatch(updateCat({point: 'standard'}))},
        {label: 'Point', onClick: () => dispatch(updateCat({point: 'point'}))},
        {label: 'Mink', onClick: () => dispatch(updateCat({point: 'mink'}))},
        {label: 'Sepia', onClick: () => dispatch(updateCat({point: 'sepia'}))}
    ];
    const sliders = [
        {label: 'Temperature', onChange: ({target: {value}}) => dispatch(updateCat({pointTemp: Number(value)}))}
    ];

    return <Section title='Colorpoint' buttons={buttons} sliders={sliders} />;
};

export default PointSection;
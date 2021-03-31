import {useDispatch} from 'react-redux';
import Section from '../Section';
import {updateCat} from '../../state/catState';

const PatternSection = () => {
    const dispatch = useDispatch();
    const buttons = [
        {label: 'Mackerel', onClick: () => dispatch(updateCat({pattern: 'mackerel'}))},
        {label: 'Classic', onClick: () => dispatch(updateCat({pattern: 'classic'}))},
        {label: 'Spotted', onClick: () => dispatch(updateCat({pattern: 'spotted'}))},
        {label: 'Marble', onClick: () => dispatch(updateCat({pattern: 'marble'}))},
        {label: 'Rosette', onClick: () => dispatch(updateCat({pattern: 'rosette'}))},
        {label: 'Ticked', onClick: () => dispatch(updateCat({pattern: 'ticked'}))},
        {label: 'Smoke', onClick: () => dispatch(updateCat({pattern: 'smoke'}))},
        {label: 'Shaded', onClick: () => dispatch(updateCat({pattern: 'shaded'}))},
        {label: 'Tipped', onClick: () => dispatch(updateCat({pattern: 'tipped'}))}
    ];
    const sliders = [
        {label: 'Spread', onChange: ({target: {value}}) => dispatch(updateCat({patternSpread: Number(value)}))}
    ];

    return <Section title='Pattern' buttons={buttons} sliders={sliders} />;
};

export default PatternSection;
import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const WhiteSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttons = [ // PRESETS
        // preset values are temporary right now, will be modified once art is complete
        {label: 'None', onClick: () => dispatch(updateCat({whiteSpread: 0}))},
        {label: 'Low', onClick: () => dispatch(updateCat({whiteSpread: 4}))},
        {label: 'Medium', onClick: () => dispatch(updateCat({whiteSpread: 8}))},
        {label: 'High', onClick: () => dispatch(updateCat({whiteSpread: 12}))}
    ];
    const sliders = [
        {
            label: 'Spread',
            onChange: ({target: {value}}) => dispatch(updateCat({whiteSpread: Number(value)})),
            value: cat.whiteSpread
        }
    ];

    return <Section title='White markings' buttons={buttons} sliders={sliders} />;
};

export default WhiteSection;
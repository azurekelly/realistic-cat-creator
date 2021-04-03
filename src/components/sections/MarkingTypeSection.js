import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const MarkingTypeSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttons = [
        {label: 'Solid', onClick: () => dispatch(updateCat({tabby: false, tortie: false}))},
        {label: 'Tabby', onClick: () => dispatch(updateCat({tabby: true, tortie: false}))},
        {label: 'Tortie', onClick: () => dispatch(updateCat({tabby: false, tortie: true}))},
        {label: 'Torbie', onClick: () => dispatch(updateCat({tabby: true, tortie: true}))}
    ];
    const sliders = [
        {
            label: 'Redness',
            onChange: ({target: {value}}) => dispatch(updateCat({redness: Number(value)})),
            value: cat.redness
        },
        {
            label: 'Contrast',
            onChange: ({target: {value}}) => dispatch(updateCat({patternContrast: Number(value)})),
            value: cat.patternContrast
        }
    ];

    return <Section title='Marking type' buttons={buttons} sliders={sliders} />;
};

export default MarkingTypeSection;
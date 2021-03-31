import {useDispatch} from 'react-redux';
import Section from '../Section';
import {updateCat} from '../../state/catState';

const MarkingTypeSection = () => {
    const dispatch = useDispatch();
    const buttons = [
        {label: 'Solid', onClick: () => dispatch(updateCat({tabby: false, tortie: false}))},
        {label: 'Tabby', onClick: () => dispatch(updateCat({tabby: true, tortie: false}))},
        {label: 'Tortie', onClick: () => dispatch(updateCat({tabby: false, tortie: true}))},
        {label: 'Torbie', onClick: () => dispatch(updateCat({tabby: true, tortie: true}))}
    ];
    const sliders = [
        {label: 'Redness', onChange: ({target: {value}}) => dispatch(updateCat({redness: Number(value)}))},
        {label: 'Contrast', onChange: ({target: {value}}) => dispatch(updateCat({patternContrast: Number(value)}))}
    ];

    return <Section title='Marking type' buttons={buttons} sliders={sliders} />;
};

export default MarkingTypeSection;
import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const MarkingTypeSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttons = [
        {label: 'Solid', onClick: () => dispatch(updateCat({tabby: false, tortie: false})), disabled: cat.baseColor === 'red'},
        {label: 'Tabby', onClick: () => dispatch(updateCat({tabby: true, tortie: false})), disabled: cat.baseColor === 'red'},
        {label: 'Tortie', onClick: () => dispatch(updateCat({tabby: false, tortie: true})), disabled: cat.baseColor === 'red'},
        {label: 'Torbie', onClick: () => dispatch(updateCat({tabby: true, tortie: true})), disabled: cat.baseColor === 'red'}
    ];
    const sliders = [
        {
            label: 'Redness',
            onChange: ({target: {value}}) => dispatch(updateCat({redness: Number(value)})),
            value: cat.redness,
            disabled: !cat.tabby && !cat.tortie && (cat.baseColor !== 'red')
        },
        {
            label: 'Contrast',
            onChange: ({target: {value}}) => dispatch(updateCat({patternContrast: Number(value)})),
            value: cat.patternContrast,
            disabled: !cat.tabby && !cat.tortie && (cat.baseColor !== 'red')
        }
    ];

    return <Section title='Marking type' buttons={buttons} sliders={sliders} disabled={cat.fullWhite} />;
};

export default MarkingTypeSection;
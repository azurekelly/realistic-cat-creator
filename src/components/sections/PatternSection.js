import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const PatternSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttons = [
        {label: 'Mackerel', onClick: () => dispatch(updateCat({pattern: 'mackerel'}))},
        {label: 'Classic', onClick: () => dispatch(updateCat({pattern: 'classic'}))},
        {label: 'Spotted', onClick: () => dispatch(updateCat({pattern: 'spotted'}))},
        {label: 'Marble', onClick: () => dispatch(updateCat({pattern: 'marble'}))},
        {label: 'Rosette', onClick: () => dispatch(updateCat({pattern: 'rosette'}))},
        {label: 'Ticked', onClick: () => dispatch(updateCat({pattern: 'ticked'}))},
        {label: 'Shaded', onClick: () => dispatch(updateCat({pattern: 'shaded'}))},
        {label: 'Tipped', onClick: () => dispatch(updateCat({pattern: 'tipped'}))}
    ];

    return <Section title='Pattern' buttons={buttons} disabled={(!cat.tabby && !cat.tortie && (cat.baseColor !== 'red')) || cat.fullWhite} />;
};

export default PatternSection;
import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const PatternSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttonGroup = [{
        buttons: [
            {label: 'Mackerel', onClick: () => dispatch(updateCat({pattern: 'mackerel'})), activated: cat.pattern === 'mackerel'},
            {label: 'Classic', onClick: () => dispatch(updateCat({pattern: 'classic'})), activated: cat.pattern === 'classic'},
            {label: 'Spotted', onClick: () => dispatch(updateCat({pattern: 'spotted'})), activated: cat.pattern === 'spotted'},
            {label: 'Ticked', onClick: () => dispatch(updateCat({pattern: 'ticked'})), activated: cat.pattern === 'ticked'},
            {label: 'Rosette', onClick: () => dispatch(updateCat({pattern: 'rosette'})), activated: cat.pattern === 'rosette'},
            {label: 'Marble', onClick: () => dispatch(updateCat({pattern: 'marble'})), activated: cat.pattern === 'marble'},
            {label: 'Shaded', onClick: () => dispatch(updateCat({pattern: 'shaded'})), activated: cat.pattern === 'shaded'},
            {label: 'Tipped', onClick: () => dispatch(updateCat({pattern: 'tipped'})), activated: cat.pattern === 'tipped'}
        ]
    }];

    return <Section title='Pattern' buttonGroups={buttonGroup} disabled={(!cat.tabby && !cat.tortie && (cat.baseColor !== 'red')) || cat.fullWhite} />;
};

export default PatternSection;
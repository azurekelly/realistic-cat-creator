import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const SilverSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttons = [
        {label: 'Standard', onClick: () => dispatch(updateCat({silver: false}))},
        {label: 'Silver', onClick: () => dispatch(updateCat({silver: true}))}
    ];

    return <Section title='Silver' buttons={buttons} disabled={cat.fullWhite} />;
};

export default SilverSection;
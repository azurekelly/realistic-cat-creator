import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const SilverSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttonGroup = [{
        buttons: [
            {label: 'Standard', onClick: () => dispatch(updateCat({silver: false})), activated: !cat.silver},
            {label: 'Silver', onClick: () => dispatch(updateCat({silver: true})), activated: cat.silver}
        ]
    }];

    return <Section title='Silver' buttonGroups={buttonGroup} disabled={cat.fullWhite} />;
};

export default SilverSection;
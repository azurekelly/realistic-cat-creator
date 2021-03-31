import {useDispatch} from 'react-redux';
import Section from '../Section';
import {updateCat} from '../../state/catState';

const SilverSection = () => {
    const dispatch = useDispatch();
    const buttons = [
        {label: 'Standard', onClick: () => dispatch(updateCat({silver: false}))},
        {label: 'Silver', onClick: () => dispatch(updateCat({silver: true}))}
    ];

    return <Section title='Silver' buttons={buttons} />;
};

export default SilverSection;
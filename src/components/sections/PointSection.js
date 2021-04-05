import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const PointSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const buttonGroup = [{
        buttons: [
            {label: 'Standard', onClick: () => dispatch(updateCat({point: 'standard'})), activated: cat.point === 'standard'},
            {label: 'Point', onClick: () => dispatch(updateCat({point: 'point'})), activated: cat.point === 'point'},
            {label: 'Mink', onClick: () => dispatch(updateCat({point: 'mink'})), activated: cat.point === 'mink'},
            {label: 'Sepia', onClick: () => dispatch(updateCat({point: 'sepia'})), activated: cat.point === 'sepia'}
        ]
    }];

    return <Section title='Colorpoint' buttonGroups={buttonGroup} disabled={cat.fullWhite} />;
};

export default PointSection;
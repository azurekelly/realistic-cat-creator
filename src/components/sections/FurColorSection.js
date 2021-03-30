import {useDispatch} from 'react-redux';
import Section from '../Section';
import {updateCat} from '../../state/catState';

const FurColorSection = () => {
    const dispatch = useDispatch();

    const buttons = [
        {label: 'Black', onClick: () => dispatch(updateCat({baseColor: 'black', dilute: false}))},
        {label: 'Chocolate', onClick: () => dispatch(updateCat({baseColor: 'chocolate', dilute: false}))},
        {label: 'Cinnamon', onClick: () => dispatch(updateCat({baseColor: 'cinnamon', dilute: false}))},
        {label: 'Red', onClick: () => dispatch(updateCat({baseColor: 'red', dilute: false}))},
        {label: 'Gray', onClick: () => dispatch(updateCat({baseColor: 'black', dilute: true}))},
        {label: 'Lilac', onClick: () => dispatch(updateCat({baseColor: 'chocolate', dilute: true}))},
        {label: 'Fawn', onClick: () => dispatch(updateCat({baseColor: 'cinnamon', dilute: true}))},
        {label: 'Cream', onClick: () => dispatch(updateCat({baseColor: 'red', dilute: true}))}
    ]
    ;
    const sliders = [
        {label: 'Redness', onChange: ({target: {value}}) => dispatch(updateCat({redness: Number(value)}))},
        {label: 'Dilution', onChange: ({target: {value}}) => dispatch(updateCat({dilution: Number(value)}))}
    ];

    return <Section title={'Fur color'} buttons={buttons} sliders={sliders} />;
};

export default FurColorSection;
import {useDispatch} from 'react-redux';
import Section from '../Section';
import {updateCat} from '../../state/catState';

const FurColorSection = () => {
    const dispatch = useDispatch();

    const buttons = [
        {label: 'Black', onClick: () => dispatch(updateCat({baseColor: 'black'}))},
        {label: 'Chocolate', onClick: () => dispatch(updateCat({baseColor: 'chocolate'}))},
        {label: 'Cinnamon', onClick: () => dispatch(updateCat({baseColor: 'cinnamon'}))},
        {label: 'Red', onClick: () => dispatch(updateCat({baseColor: 'red'}))},
        {label: 'Gray', onClick: () => dispatch(updateCat({baseColor: 'gray'}))},
        {label: 'Lilac', onClick: () => dispatch(updateCat({baseColor: 'lilac'}))},
        {label: 'Fawn', onClick: () => dispatch(updateCat({baseColor: 'fawn'}))},
        {label: 'Cream', onClick: () => dispatch(updateCat({baseColor: 'cream'}))}
    ]
    ;
    const sliders = [
        {label: 'Redness', onChange: ({target: {value}}) => dispatch(updateCat({redness: value}))},
        {label: 'Dilution', onChange: ({target: {value}}) => dispatch(updateCat({dilution: value}))}
    ];

    return <Section title={'Fur color'} buttons={buttons} sliders={sliders} />;
};

export default FurColorSection;
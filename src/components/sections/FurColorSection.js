import {useSelector, useDispatch} from 'react-redux';
import Section from '../Section';
import {catSelector, updateCat} from '../../state/catState';

const FurColorSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);

    const buttons = [
        {
            label: 'Black',
            onClick: () => dispatch(updateCat({baseColor: 'black', dilute: false, fullWhite: false})),
            activated: !cat.fullWhite && !cat.dilute && cat.baseColor == 'black'
        },
        {
            label: 'Chocolate',
            onClick: () => dispatch(updateCat({baseColor: 'chocolate', dilute: false, fullWhite: false})),
            activated: !cat.fullWhite && !cat.dilute && cat.baseColor == 'chocolate'
        },
        {
            label: 'Cinnamon',
            onClick: () => dispatch(updateCat({baseColor: 'cinnamon', dilute: false, fullWhite: false})),
            activated: !cat.fullWhite && !cat.dilute && cat.baseColor == 'cinnamon'
        },
        {
            label: 'Red',
            onClick: () => dispatch(updateCat({baseColor: 'red', dilute: false, fullWhite: false})),
            activated: !cat.fullWhite && !cat.dilute && cat.baseColor == 'red'
        },
        {
            label: 'Gray',
            onClick: () => dispatch(updateCat({baseColor: 'black', dilute: true, fullWhite: false})),
            activated: !cat.fullWhite && cat.dilute && cat.baseColor == 'black'
        },
        {
            label: 'Lilac',
            onClick: () => dispatch(updateCat({baseColor: 'chocolate', dilute: true, fullWhite: false})),
            activated: !cat.fullWhite && cat.dilute && cat.baseColor == 'chocolate'
        },
        {
            label: 'Fawn',
            onClick: () => dispatch(updateCat({baseColor: 'cinnamon', dilute: true, fullWhite: false})),
            activated: !cat.fullWhite && cat.dilute && cat.baseColor == 'cinnamon'
        },
        {
            label: 'Cream',
            onClick: () => dispatch(updateCat({baseColor: 'red', dilute: true, fullWhite: false})),
            activated: !cat.fullWhite && cat.dilute && cat.baseColor == 'red'
        },
        {
            label: 'White',
            onClick: () => dispatch(updateCat({fullWhite: true})),
            activated: cat.fullWhite
        }
    ];
    const sliders = [
        {
            label: 'Redness',
            onChange: ({target: {value}}) => dispatch(updateCat({redness: Number(value)})),
            value: cat.redness,
            disabled: cat.baseColor !== 'red' || cat.fullWhite
        },
        {
            label: 'Dilution',
            onChange: ({target: {value}}) => dispatch(updateCat({dilution: Number(value)})),
            value: cat.dilution,
            disabled: !cat.dilute || cat.fullWhite
        }
    ];

    return <Section title={'Fur color'} buttons={buttons} sliders={sliders} />;
};

export default FurColorSection;
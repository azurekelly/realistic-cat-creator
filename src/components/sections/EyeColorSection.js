import {useDispatch, useSelector} from 'react-redux';
import {catSelector, updateCat} from '../../state/catState';
import Section from '../Section';

const EyeColorSection = () => {
    const dispatch = useDispatch();
    const cat = useSelector(catSelector);
    const hasNormalEyes = (!cat.blueEyes || (!cat.fullWhite && cat.whiteSpread < 8)) &&
        !(!cat.fullWhite && (cat.point === 'point' || cat.point === 'mink'));

    const buttonGroup = [{
        // title: 'Presets',
        buttons: [
            {
                label: 'Copper',
                onClick: () => dispatch(updateCat({eyeColor: 'copper', blueEyes: false})),
                disabled: !cat.fullWhite && (cat.point === 'point' || cat.point === 'mink'),
                activated: cat.eyeColor === 'copper' && hasNormalEyes
            },
            {
                label: 'Orange',
                onClick: () => dispatch(updateCat({eyeColor: 'orange', blueEyes: false})),
                disabled: !cat.fullWhite && (cat.point === 'point' || cat.point === 'mink'),
                activated: cat.eyeColor === 'orange' && hasNormalEyes
            },
            {
                label: 'Yellow',
                onClick: () => dispatch(updateCat({eyeColor: 'yellow', blueEyes: false})),
                disabled: !cat.fullWhite && (cat.point === 'point' || cat.point === 'mink'),
                activated: cat.eyeColor === 'yellow' && hasNormalEyes
            },
            {
                label: 'Hazel',
                onClick: () => dispatch(updateCat({eyeColor: 'hazel', blueEyes: false})),
                disabled: !cat.fullWhite && (cat.point === 'point' || cat.point === 'mink'),
                activated: cat.eyeColor === 'hazel' && hasNormalEyes
            },
            {
                label: 'Green',
                onClick: () => dispatch(updateCat({eyeColor: 'green', blueEyes: false})),
                disabled: !cat.fullWhite && (cat.point === 'point' || cat.point === 'mink'),
                activated: cat.eyeColor === 'green' && hasNormalEyes
            },
            {
                label: 'Aqua',
                // no onClick, there's no way to manually change to aqua, the button is just thee for signalling when it already is aqua
                disabled: cat.point !== 'mink' || cat.fullWhite,
                activated: cat.point === 'mink' && !cat.fullWhite
            },
            {
                label: 'Blue',
                onClick: () => dispatch(updateCat({blueEyes: true})),
                disabled: (!cat.fullWhite && cat.whiteSpread < 8 && cat.point !== 'point') || (cat.point === 'mink' && !cat.fullWhite),
                activated:
                    ((cat.blueEyes && (cat.fullWhite || cat.whiteSpread >= 8)) || // if you have blue eyes and can show them
                    (cat.point === 'point' && !cat.fullWhite)) && // or if you're an unmasked point
                    !(cat.point === 'mink' && !cat.fullWhite) // and you're not an unmasked mink
            }
        ]
    }];

    // TODO add in pigment simulations and re-enable these sliders
    // const sliders = [
    //     {label: 'Pigment intensity', disabled: true},
    //     {label: 'Blue refraction', disabled: true}
    // ];

    return <Section title='Eye color' buttonGroups={buttonGroup} />;
};

export default EyeColorSection;
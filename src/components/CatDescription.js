import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {catSelector} from '../state/catState';

export const getDescription = cat => {
    // no need to do any further checks for solid white cats
    if(cat.fullWhite) return 'White';

    let result;
    // helper checks
    const isRed = cat.baseColor === 'red';
    const isBlack = cat.baseColor === 'black';
    const isStriped = cat.tabby || isRed;
    const isGolden = (
        (cat.pattern === 'shaded' || cat.pattern === 'tipped') &&
        (isStriped || cat.tortie)
    );

    // COLOR
    if(cat.dilute) {
        const diluteColors = {black: 'blue', chocolate: 'lilac', cinnamon: 'fawn', red: 'cream'};
        result = diluteColors[cat.baseColor];
    }
    else if(isBlack) { // as the most common color, black cats tend to have unique color names
        if(cat.silver && cat.tabby) result = 'silver';
        else if(isGolden) result = 'golden';
        else if(cat.point !== 'standard') result = 'seal';
        else if(cat.tabby) result = 'brown';
        else result = 'black';
    }
    else {
        result = cat.baseColor;
    }

    // SILVER AND GOLDEN
    if(cat.silver) {
        if(isStriped && !isBlack) result += ' silver'; // tabbies and torbies
        else if(!isStriped) result += ' smoke'; // solid and torties
    }
    else if(isGolden && !isBlack) { // if shaded/tipped non-black tabby (since black already has golden in the name)
        result += ' golden';
    }

    // MARKINGS
    if(isStriped || isGolden) result += ' ' + cat.pattern;
    if(!isRed && cat.tortie) result += (cat.tabby) ? ' torbie' : ' tortie';
    else if(isStriped && (cat.pattern !== 'shaded' && cat.pattern !== 'tipped')) result += ' tabby';

    // COLORPOINT
    if(cat.point !== 'standard') result += ' ' + cat.point;

    // WHITE MARKINGS
    if(cat.whiteSpread > 0) result += ' bicolor';

    // TORTIE MARKINGS SPECIAL CASE
    if(cat.tortie && !isStriped && !isGolden) result += ` with ${cat.pattern} markings`;

    // capitalize the first letter
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
};

const Container = styled.div`
    min-height: 10%;
    padding: 2rem 4rem 4rem;
    font-size: 2rem;
    text-align: center;
`;

const CatDescription = () => {
    const cat = useSelector(catSelector);
    return <Container>{getDescription(cat)}</Container>;
};

export default CatDescription;
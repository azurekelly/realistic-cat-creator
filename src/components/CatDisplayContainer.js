import {useState, useEffect} from 'react';
import {loadImage} from '../utils/utils';
import lineart from '../images/lineart.png';
import {withSize} from 'react-sizeme';
import CatDisplay from './CatDisplay';

const CatDisplayContainer = ({size, children}) => {
    const [aspectRatio, setAspectRatio] = useState(1);
    const [maxWidth, setMaxWidth] = useState(Infinity);
    const calculatedWidth = size.height / aspectRatio;
    const calculatedHeight = size.width * aspectRatio;
    let width = calculatedHeight < size.height ? size.width : calculatedWidth;
    let height = calculatedHeight < size.height ? calculatedHeight : size.height;

    if(width > maxWidth) { // avoid image quality loss from overscaling
        width = maxWidth;
        height = maxWidth * aspectRatio;
    }

    useEffect(() => { // load image to get aspect ratio and max width
        loadImage(lineart).then(img => {
            setMaxWidth(img.width);
            setAspectRatio(img.height / img.width);
        });
    }, []);

    return <div style={{width: '100%', height: '100%'}}><CatDisplay width={width} height={height} /></div>;
};

export default withSize({monitorHeight: true})(CatDisplayContainer);
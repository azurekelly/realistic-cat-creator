import {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {catSelector} from '../state/catState';
import CatCanvas from '../rendering/CatCanvas';
import {loadImage} from '../utils/utils';
import lineart from '../images/lineart.png';
import {withSize} from 'react-sizeme';

// TODO add unit tests for component
// TODO try and reduce flickering on container resize
const CatDisplay = ({size}) => {
    const canvasRef = useRef();
    const catCanvas = useRef();
    const cat = useSelector(catSelector);
    const [loaded, setLoaded] = useState(false);

    // dynamically size content
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

    useEffect(() => {
        catCanvas.current = new CatCanvas(canvasRef.current, () => setLoaded(true));
        loadImage(lineart).then(img => {
            setMaxWidth(img.width);
            setAspectRatio(img.height / img.width);
        });
    }, []);

    useEffect(() => {
        catCanvas.current.drawCat(cat);
    }, [cat, loaded, size, aspectRatio]);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
        </div>
    );
};

// wrap in withSize to allow dynamic resizing of the canvas
export default withSize({monitorHeight: true})(CatDisplay);
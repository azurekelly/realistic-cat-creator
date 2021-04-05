import {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {catSelector} from '../state/catState';
import CatCanvas from '../rendering/CatCanvas';

// TODO add unit tests for component
// TODO try and reduce flickering on container resize
const CatDisplay = ({width, height}) => {
    const canvasRef = useRef();
    const catCanvas = useRef();
    const cat = useSelector(catSelector);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        catCanvas.current = new CatCanvas(canvasRef.current, () => setLoaded(true));
    }, []);

    useEffect(() => {
        catCanvas.current.drawCat(cat);
    }, [cat, loaded, width, height]);

    return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default CatDisplay;
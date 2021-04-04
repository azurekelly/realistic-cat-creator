import {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {catSelector} from '../state/catState';
import CatCanvas from '../rendering/CatCanvas';

// TODO add unit tests for component
const CatDisplay = () => {
    const canvasRef = useRef();
    const cat = useSelector(catSelector);
    const catCanvas = useRef();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        catCanvas.current = new CatCanvas(canvasRef.current, () => setLoaded(true));
    }, []);

    useEffect(() => {
        catCanvas.current.drawCat(cat);
    }, [cat, loaded]);

    // TODO resize dynamically
    return <canvas ref={canvasRef} width={700} height={700}></canvas>;
};

export default CatDisplay;
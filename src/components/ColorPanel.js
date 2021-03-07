import FurColorSection from './FurColorSection';
import Slider from './Slider';
import Button from './Button';

const ColorPanel = () => {
    const eyeColors = ['Copper', 'Orange', 'Yellow', 'Hazel', 'Green', 'Aqua', 'Blue'];
    const eyeSliders = ['Pigment intensity', 'Blue refraction'];
    
    return (
        <>
            <FurColorSection />
            <section>
                <h2>Eye color</h2>
                {eyeColors.map(color => <Button value={color} />)}
                <section>
                    <h3>Advanced</h3>
                    {eyeSliders.map(label => <Slider label={label} />)}
                </section>
            </section>
        </>
    );
};

export default ColorPanel;
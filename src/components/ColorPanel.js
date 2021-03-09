import FurColorSection from './FurColorSection';
import Slider from './Slider';
import Button from './Button';
import AdvancedSection from './AdvancedSection';

const ColorPanel = () => {
    const eyeColors = ['Copper', 'Orange', 'Yellow', 'Hazel', 'Green', 'Aqua', 'Blue'];
    const eyeSliders = ['Pigment intensity', 'Blue refraction'];
    
    return (
        <>
            <FurColorSection />
            <section>
                <h2>Eye color</h2>
                {eyeColors.map(color => <Button value={color} />)}
                <AdvancedSection collapsed={false}>
                    {eyeSliders.map(label => <Slider label={label} min={0} max={32} defaultValue={16} />)}
                </AdvancedSection>
            </section>
        </>
    );
};

export default ColorPanel;
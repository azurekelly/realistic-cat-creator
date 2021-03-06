import Slider from './Slider';
import Button from './Button';

const ColorPanel = () => {
    const furColors = ['Black', 'Chocolate', 'Cinnamon', 'Red', 'Gray', 'Lilac', 'Fawn', 'Cream'];
    const furSliders = ['Pigment intensity', 'Eumelanin color', 'Diluation'];
    const eyeColors = ['Copper', 'Orange', 'Yellow', 'Hazel', 'Green', 'Aqua', 'Blue'];
    const eyeSliders = ['Pigment intensity', 'Blue refraction'];
    
    return (
        <>
            <section>
                <h2>Fur color</h2>
                {furColors.map(color => <Button value={color} />)}
                <section>
                    <h3>Advanced</h3>
                    {furSliders.map(label => <Slider label={label} />)}
                </section>
            </section>
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
import Slider from './Slider';
import PresetButton from './PresetButton';

const ColorPanel = () => {
    return (
        <>
            <section>
                <h2>Fur color</h2>
                <PresetButton value='Black' />
                <PresetButton value='Chocolate' />
                <PresetButton value='Cinnamon' />
                <PresetButton value='Red' />
                <PresetButton value='Gray' />
                <PresetButton value='Lilac' />
                <PresetButton value='Fawn' />
                <PresetButton value='Cream' />
                <section>
                    <h3>Advanced</h3>
                    <Slider label='Pigment intensity' />
                    <Slider label='Eumelanin color' />
                    <Slider label='Dilution' />
                </section>
            </section>
            <section>
                <h2>Eye color</h2>
                <PresetButton value='Copper' />
                <PresetButton value='Orange' />
                <PresetButton value='Yellow' />
                <PresetButton value='Hazel' />
                <PresetButton value='Green' />
                <PresetButton value='Aqua' />
                <PresetButton value='Blue' />
                <section>
                    <h3>Advanced</h3>
                    <Slider label='Pigment intensity' />
                    <Slider label='Blue refraction' />
                </section>
            </section>
        </>
    );
};

export default ColorPanel;
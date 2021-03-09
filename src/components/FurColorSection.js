import Button from './Button';
import Slider from './Slider';
import AdvancedSection from './AdvancedSection';

const colors = ['Black', 'Chocolate', 'Cinnamon', 'Red', 'Gray', 'Lilac', 'Fawn', 'Cream'];
const sliders = [
    {label: 'Pigment intensity', min: 0, max: 16, start: 8}, 
    {label: 'Eumelanin color', min: 0, max: 16, start: 8}, 
    {label: 'Dilution', min: 0, max: 16, start: 8}
];

const FurColorSection = () => {
    return (<section>
        <h2>Fur color</h2>
        {colors.map(color => <Button value={color} key={color} />)}
        <AdvancedSection collapsed={false}>
            {sliders.map(({label, min, max, start}) => <Slider label={label} min={min} max={max} step={1} defaultValue={start} key={label} />)}
        </AdvancedSection>
    </section>)
};

export default FurColorSection;
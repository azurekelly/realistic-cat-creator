import Button from './Button';
import AdvancedSection from './AdvancedSection';
import Slider from './Slider';

const sliderMin = 0;
const sliderMax = 16;
const sliderDefault = 8;

// buttons and sliders should be passed as objects, not components
const Section = ({title, buttons, sliders, disabled, advancedCollapsed = true}) => (
    <section>
        <h2>{title}</h2>
        {buttons && (buttons.map(button => (
            <Button
                key={button.label}
                value={button.label}
                onClick={button.onClick}
                disabled={button.disabled || disabled}
            />
        )))}
        {sliders && (
            <AdvancedSection collapsed={advancedCollapsed}>
                {sliders.map(slider => (
                    <Slider
                        key={slider.label}
                        label={slider.label}
                        min={sliderMin}
                        max={sliderMax}
                        value={slider.value}
                        step={1}
                        onChange={slider.onChange}
                        disabled={slider.disabled || disabled}
                    />
                ))}
            </AdvancedSection>
        )}
    </section>
);

export default Section;
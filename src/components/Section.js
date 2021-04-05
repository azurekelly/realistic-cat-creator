import Button from './Button';
import Slider from './Slider';

// buttons and sliders should be passed as objects, not components
const Section = ({title, buttonGroups, sliders, disabled}) => (
    <section>
        <h2>{title}</h2>
        {buttonGroups && (buttonGroups.map((group, i) => {
            if((group.shouldRender === undefined) || group.shouldRender) {
                return (
                    <section key={i}>
                        {group.title && (
                            <h3>{group.title}</h3>
                        )}
                        {group.buttons.map(button => (
                            <Button
                                key={button.label}
                                value={button.label}
                                onClick={button.onClick}
                                disabled={button.disabled || disabled}
                                activated={button.activated}
                            />
                        ))}
                    </section>
                );
            }
            else {
                return <></>;
            }
        }))}
        {sliders && (sliders.map(slider => (
            <Slider
                key={slider.label}
                label={slider.label}
                min={0}
                max={16}
                value={slider.value}
                step={1}
                onChange={slider.onChange}
                disabled={slider.disabled || disabled}
            />
        )))}
    </section>
);

export default Section;
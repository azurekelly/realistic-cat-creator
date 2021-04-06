import Button from './Button';
import Slider from './Slider';
import styled from 'styled-components';

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FlexButton = styled(Button)`
    flex-basis: 23%;
    padding: 0.5rem 0; // Allows longer items like cinnamon to shrink
    @media (max-width: 1400px) { // the point at which the longer buttons look bad
        flex-basis: calc(50% - 0.5rem);
    }
    @media (max-width: 768px) {
        flex-basis: 100%;
    }
`;

// buttons and sliders should be passed as objects, not components
const Section = ({title, buttonGroups, sliders, disabled}) => (
    <section>
        <h2>{title}</h2>
        {buttonGroups && (buttonGroups.map((group, i) => {
            if((group.shouldRender === undefined) || group.shouldRender) {
                return (
                    <>
                        {group.title && (<h3>{group.title}</h3>)}
                        <ButtonGroup key={i}>
                            {group.buttons.map(button => (
                                <FlexButton
                                    key={button.label}
                                    value={button.label}
                                    onClick={button.onClick}
                                    disabled={button.disabled || disabled}
                                    activated={button.activated}
                                />
                            ))}
                        </ButtonGroup>
                    </>
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
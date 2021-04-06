import styled from 'styled-components';
import Button from './Button';
import Slider from './Slider';
import {colors} from '../theme';

const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
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

const SectionHeading = styled.h2`
    text-transform: uppercase;
    font-weight: normal;
    border-bottom: 1px solid ${colors.darkGray};
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
`;

const GroupHeading = styled.h3`
    margin: 1rem 0 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1rem;
`;

// buttons and sliders should be passed as objects, not components
const Section = ({title, buttonGroups, sliders, disabled}) => (
    <section>
        <SectionHeading>{title}</SectionHeading>
        {buttonGroups && (buttonGroups.map((group, i) => {
            if((group.shouldRender === undefined) || group.shouldRender) {
                return (
                    <>
                        {group.title && (<GroupHeading>{group.title}</GroupHeading>)}
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
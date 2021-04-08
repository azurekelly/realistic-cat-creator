import styled from 'styled-components';
import {colors, font} from '../theme';

const StyledContainer = styled.div`
    margin-bottom: 1em;
`;

const StyledLabel = styled.span`
    display: block;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledSlider = styled.input.attrs({type: 'range'})`
    margin-right: 1em;
    flex-grow: 1;
`;

const StyledInput = styled.input.attrs({type: 'number', required: true})`
    min-width: 0;
    width: 4rem;
    padding: 0.5rem;
    padding-left: 1rem;
    border-radius: 0.25rem;
    background: ${colors.lightGray};
    border: none;
    font-family: ${font};
    color: ${colors.darkGay};

    &:focus-visible {
        outline-color: ${colors.primary};
    }
`;

const Slider = ({label, ...props}) => (
    <StyledContainer>
        <StyledLabel>{label}</StyledLabel>
        <FlexContainer>
            <StyledSlider aria-label={label} {...props} />
            <StyledInput aria-label={label + ' number'} {...props} onChange={e => {
                // constrict value to min and max
                e.target.value = Math.max(Math.min(e.target.value, e.target.max), e.target.min);

                if(props.onChange) {
                    props.onChange(e);
                }
            }} />
        </FlexContainer>
    </StyledContainer>
);

export default Slider;
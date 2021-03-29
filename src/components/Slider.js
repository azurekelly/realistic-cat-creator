import styled from 'styled-components';

const StyledContainer = styled.div`
    padding-bottom: 1em;
`;

const StyledSlider = styled.input.attrs({type: 'range'})`
    display: block;
    width: 100%;
`;
const StyledLabel = styled.span`
    display: block;
`;

const Slider = ({label, ...props}) => (
    <StyledContainer>
        <label>
            <StyledLabel>{label}</StyledLabel>
            <StyledSlider {...props} />
        </label>
    </StyledContainer>
);

export default Slider;
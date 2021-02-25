import styled from 'styled-components';

const StyledContainer = styled.div`
    padding-bottom: 1em;
`;

const StyledSlider = styled.input`
    display: block;
    width: 100%;
`;
const StyledLabel = styled.span`
    display: block;
`;

const Slider = ({label, ...props}) => {
    return (<StyledContainer>
        <label>
            <StyledLabel>{label}</StyledLabel>
            <StyledSlider type="range" {...props}></StyledSlider>
        </label>
    </StyledContainer>);
};

export default Slider;
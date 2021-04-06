import styled from 'styled-components';

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
    flex-basis: 90%;
    margin-right: 1em;

`;

const StyledInput = styled.input.attrs({type: 'number', required: true})`
    flex-basis: 10%;
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
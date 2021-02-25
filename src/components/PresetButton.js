import styled from 'styled-components';

const StyledButton = styled.input`
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-family: 'Montserrat', sans-serif;
`;

const PresetButton = (props) => {
    return <StyledButton type='button' {...props} />;
};

export default PresetButton;
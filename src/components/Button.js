import styled from 'styled-components';
import {colors} from '../theme';

const Button = styled.input.attrs({type: 'button'})`
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    background-color: ${props => (props.activated ? colors.primary : colors.white)};
    color: ${props => (props.activated ? colors.white : colors.primary)};
    border-radius: 0.25em;
    border: 2px solid ${colors.primary};
    cursor: pointer;
    flex-basis: 23%;

    &:hover, &:focus {
        background-color: ${props => (props.activated ? colors.primaryHover : colors.primaryInvertedHover)};
        color: ${props => (props.activated ? colors.white : colors.primaryPressed)}; // darker text color to allow better readability with hover bg color
        outline-color: ${colors.primary}; // override the default black outline
    }
    &:active {
        background-color: ${props => (props.activated ? colors.primaryPressed : colors.primary)};
        color: ${colors.white};
    }
    &:disabled {
        background-color: ${props => (props.activated ? colors.primaryDisabled : colors.white)};
        border-color: ${colors.primaryDisabled};
        color: ${props => (props.activated ? colors.white : colors.primaryDisabled)};
        cursor: default;
    }
`;

export default Button;
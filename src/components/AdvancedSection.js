import {useState} from 'react';
import styled from 'styled-components';
// TODO styling of button

const CollapseButton = styled.div.attrs({role: 'button'})`
    font-weight: bold;
    margin: 1em 0;
    cursor: pointer;
`;

const AdvancedSection = ({collapsed = true, children}) => {
    const [collapsedState, setCollapsedState] = useState(collapsed);
    const handleClick = () => {setCollapsedState(!collapsedState)};

    return (
        <section>
            <CollapseButton onClick={handleClick}>Advanced</CollapseButton>
            {!collapsedState && children}
        </section>
    )
};

export default AdvancedSection;
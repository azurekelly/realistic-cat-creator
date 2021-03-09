import {useState} from 'react';
// TODO styling of button

const AdvancedSection = ({collapsed = true, children}) => {
    const [collapsedState, setCollapsedState] = useState(collapsed);
    const handleClick = () => {setCollapsedState(!collapsedState)};

    return (
        <section>
            <div role='button' onClick={handleClick}>Advanced</div>
            {!collapsedState && children}
        </section>
    )
};

export default AdvancedSection;
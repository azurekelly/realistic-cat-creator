import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {updateCat} from '../state/catState';
import {initialState} from '../state/store';
import {generateRandomCat} from '../utils/randomizerUtils';
import Button from './Button';

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    // easier to add a negative margin here then change the heading margin for only the first section in this case
    margin-bottom: -1rem;
`;

const ButtonControls = () => {
    const dispatch = useDispatch();
    const handleReset = () => dispatch(updateCat(initialState.cat));
    const handleRandomize = () => dispatch(updateCat(generateRandomCat()));

    return (
        <Container>
            <Button value={'Start over'} onClick={handleReset} />
            <Button value={'Randomize'} onClick={handleRandomize} />
        </Container>
    );
};

export default ButtonControls;
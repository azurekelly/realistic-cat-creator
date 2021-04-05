import {useDispatch} from 'react-redux';
import {updateCat} from '../state/catState';
import {initialState} from '../state/store';
import {generateRandomCat} from '../utils/randomizerUtils';
import Button from './Button';

const ButtonControls = () => {
    const dispatch = useDispatch();
    const handleReset = () => dispatch(updateCat(initialState.cat));
    const handleRandomize = () => dispatch(updateCat(generateRandomCat()));

    return (
        <section>
            <Button value={'Start over'} onClick={handleReset} />
            <Button value={'Randomize'} onClick={handleRandomize} />
        </section>
    );
};

export default ButtonControls;
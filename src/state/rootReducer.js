import {combineReducers} from 'redux';
import cat from './catState';

// using combineReducers to be able to add more reducers later
const rootReducer = combineReducers({cat});

export default rootReducer;
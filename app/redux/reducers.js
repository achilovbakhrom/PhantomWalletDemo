import {combineReducers} from 'redux';
import mainReducer from './main/reducer';

const rootReducer = combineReducers({
    main: mainReducer    
});

export default rootReducer;

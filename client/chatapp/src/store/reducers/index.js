import {combineReducers} from 'redux';
import {authReducer} from '../reducers/auth';
import {chatReducer} from '../reducers/chat';

export default combineReducers({
   authReducer,
   chatReducer  
})
import {combineReducers} from 'redux'
import auth from './authReducer';
import token from './tokenReducers'


export default combineReducers({
    auth,
    token
});
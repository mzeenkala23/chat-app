import {LOGIN, REGISTER} from '../actions/auth';

/*  Todo
    set local storage in state
*/

const initialState = {
    user: {},
    token: '',
    isLoggedIn: false
}


export const authReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOGIN:
            return {
                ...state,
                user: payload,
                token: payload.token,
                isLoggedIn: true
            }
        case REGISTER:
            return {
                ...state,
                user: payload,
                token: payload.token,
                isLoggedIn: true
            }
            
        default:
            return state
    }
}
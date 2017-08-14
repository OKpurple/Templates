import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';
import axios from 'axios';

/*============================================================================
    authentication
==============================================================================*/

/* LOGIN */


export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function loginRequest(login_id, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/api/account/signin', { login_id, password })
        .then((response) => {
            // SUCCEED
            dispatch(loginSuccess(login_id));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}

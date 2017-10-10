import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

import { updateProfileSuccess } from './user'
import { getProfile } from './user'
import axios from 'axios';

/*============================================================================
    authentication
==============================================================================*/

/* LOGIN */

//로그인 중임을 말함 status가 waitng이 됨
export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(userId) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        userId
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

//로그아웃 스태이터스 변경
export function logout(){
  return {
          type: AUTH_LOGOUT
      };
    }

//서버에서 세션 파괴 시켜줌
export function logoutRequest() {
  return (dispatch) => {
      return axios.post('/api/account/logout')
      .then((response) => {
          dispatch(logout());
      });
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

            if(response.data.meta.code === -10){
              console.log("INVALID_REQUEST");
            }else{
              var proData = response.data.data;
              console.log("login action success "+proData.user_id);
              dispatch(loginSuccess(proData.user_id));
              dispatch(getProfile(proData.user_id));//프로필불러오기
              return dispatch(updateProfileSuccess(proData));//이거 왜안될까
            }
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}







export function registFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function registRequest(data) {
    return (dispatch) => {
        // Inform Login API is starting

        let loginId = data.loginId;
        let password = data.password;
        let firstName = data.firstName;
        let lastName = data.lastName;

        // API REQUEST
        return axios.post('/api/account/signup', {loginId,password,firstName,lastName  })
        .then((response) => {
            // SUCCEED

            if(response.data.meta.code === -10){
              console.log("INVALID_REQUEST");
            }else{

              console.log("regist success"+response.data.data.userId);
              dispatch(loginSuccess(response.data.data.userId));
              dispatch(getProfile(response.data.data.userId))//프로필불러오기
            }
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}

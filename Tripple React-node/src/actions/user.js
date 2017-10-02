import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from './ActionTypes';
import axios from 'axios';



export function getProfileSuccess(data){
  return{
    type: GET_PROFILE_SUCCESS,
    data
  };
}

export function getProfileFailure(){
  return{
    type: GET_PROFILE_FAILURE
  };
}

export function getProfile(user_id){
  return (dispatch)=>{
    let url = '/api/account/info/'+user_id;
    return axios.get(url)
    .then((res)=>{
      dispatch(getProfileSuccess(res.data.data))
    }).catch((err)=>{
      dispatch(getProfileFailure);
    })
  };
};

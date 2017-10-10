import {
  OPEN_PROGRAMS,
  OPEN_PROGRAMS_SUCCESS,
  OPEN_PROGRAMS_FAILURE,
  GET_OPEN_PROGRAM_DETAIL,
  GET_OPEN_PROGRAM_DETAIL_SUCCESS,
  GET_OPEN_PROGRAM_DETAIL_FAILURE,
  GET_ROUTES_SUCCESS,
  GET_ROUTES_FAILURE,
  APPLY_OPEN_SUCCESS,
  APPLY_OPEN_FAILURE,
  WISH_LIST_FAILURE,
  WISH_LIST_SUCCESS
} from './ActionTypes';

import axios from 'axios';

export function openPrograms(){
    return {
      type: OPEN_PROGRAMS
    }
}

export function openProgramsRequest(city,meeting_date){
  return (dispatch)=>{

  };
}

export function getOpenProgramDetailSuccess(data){
    return {
      type: GET_OPEN_PROGRAM_DETAIL_SUCCESS,
      data
    }
}

export function getOpenProgramDetailFailure(data){
    return {
      type: GET_OPEN_PROGRAM_DETAIL_FAILURE,
      data
    }
}

export function getOpenProgramDetail(program_id){
  return (dispatch)=>{
    let url = '/api/openPrograms/detail/'+program_id;
    return axios.get(url)
    .then((response)=>{
      dispatch(getOpenProgramDetailSuccess(response.data.data))
    }).catch((err)=>{
      dispatch(getOpenProgramDetailFailure());
    })
  }
}


export function getRoutesSuccess(data){
    return {
      type: GET_ROUTES_SUCCESS,
      data
    }
}

export function getRoutesFailure(){
    return {
      type: GET_ROUTES_FAILURE
    }
}

export function getRoutesInfo(opid){
  return (dispatch)=>{
    let url = '/api/openPrograms/routes/'+opid;
    return axios.get(url)
    .then((response)=>{
      dispatch(getRoutesSuccess(response.data.data))
    }).catch((err)=>{
      dispatch(getRoutesFailure());
    })
  }
}

export function applyOpenSuccess(data){
    return {
      type: APPLY_OPEN_SUCCESS

    }
}

export function applyOpenFailure(){
    return {
      type: APPLY_OPEN_FAILURE
    }
}

export function applyOpen(pid,date){
  return (dispatch)=>{
    let url = '/api/openPrograms/'+pid;
    return axios.post(url,{date})
    .then((response)=>{
      if(response.data.meta.code === 0){
        dispatch(applyOpenSuccess())
      }else{
        dispatch(applyOpenFailure());
      }
    }).catch((err)=>{
      dispatch(applyOpenFailure());
    })
  }
}



export function wishListSuccess(data){
    return {
      type: WISH_LIST_SUCCESS,
      data
    }
}

export function wishListFailure(){
    return {
      type: WISH_LIST_FAILURE
    }
}

export function getWishList(user_id){
  return (dispatch)=>{
    let url = '/api/openPrograms/wishList/'+user_id;
    return axios.get(url)
    .then((response)=>{
      if(response.data.meta.code === 0){
        dispatch(wishListSuccess(response.data.data))
      }else{
        dispatch(wishListFailure());
      }
    }).catch((err)=>{
      dispatch(wishListFailure());
    })
  }
}

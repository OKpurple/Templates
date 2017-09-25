import {
  PROGRAMS_LIST,
  PROGRAMS_LIST_SUCCESS,
  PROGRAMS_LIST_FAILURE,
  APPLY_PROGRAM_LIST_SUCCESS,
  SEARCH_PROGRAM_LIST_SUCCESS,
  SEARCH_PROGRAM_LIST
} from './ActionTypes';
import axios from 'axios';

export function programsList(){
    return {
      type: PROGRAMS_LIST
    }
}
export function programsListFailure(){
    return {
      type: PROGRAMS_LIST
    }
}


export function programsListSuccess(data, isInitial, listType){
    return {
      type: PROGRAMS_LIST_SUCCESS,
      data,
      isInitial,
      listType
    };
}

export function searchProgramListSuccess(data){
  return {
    type : SEARCH_PROGRAM_LIST_SUCCESS,
    data
  }
}


export function searchProgramListRequest(city, date){
  return (dispatch)=>{

    if(city === undefined){
      console.log("city undefined")
      city = "undefined"
    }

    let url = '/api/openPrograms/search/'+city+'/'+date;
    
    return axios.get(url)
    .then((res)=>{
      dispatch(searchProgramListSuccess(res.data.data))
    }).catch((err)=>{
      dispatch();
    })
  };
};

//내가 예약한 프로그램
export function applyProgramListRequest(user_id){
  return (dispatch)=>{
    let url = 'api/openPrograms/'+user_id;

    return axios.get(url)
    .then((response)=>{
      console.log(url);
      dispatch(applyProgramListSuccess(response.data.data))
    }).catch((err)=>{
      dispath();
    })
  }
}


//나의 프로그램
export function programListRequest(isInitial, listType, user_id){
  return (dispatch)=>{
    let url = 'api/programs/op/'+user_id;

    return axios.get(url)
    .then((response)=>{
      console.log(url);
      dispatch(programsListSuccess(response.data.data,isInitial,listType))
    }).catch((err)=>{
      dispatch(programsListFailure());
    })

  };
}

export function applyProgramListSuccess(data){
  return {
    type : APPLY_PROGRAM_LIST_SUCCESS,
    data
  }
}

import {
  DIB,
  DIB_SUCCESS,
  DIB_FAILURE,
  DELETE_DIB_SUCCESS
} from './ActionTypes';

import axios from 'axios';


export function dib(){
    return {
      type: DIB
    }
}
export function dibFailure(){
    return {
      type: DIB_FAILURE
    }
}
export function dibSuccess(){
    return {
      type: DIB_SUCCESS
    }
}

export function dibRequest(opid,cid){
  return (dispatch)=>{
    dispatch(dib());
    console.log(opid,cid)
    return axios.post('/api/reserve/dib',
      {
        opid,
        cid
      }
    ).then((response)=>{
      if(response.data.meta.code === 0){

        return dispatch(dibSuccess());
      }else{
        return dispatch(dibFailure());
      }
    }).catch((err)=>{
      return dispatch(dibFailure());
    })
  }
}

export function deleteDibSuccess(index){
    return {
      type: DELETE_DIB_SUCCESS,
      index
    }
}

export function deleteDib(rid,index){
  return (dispatch)=>{
    var url = '/api/reserve/dib/'+rid
    console.log(url);
    return axios.delete(url).then((response)=>{
      if(response.data.meta.code === 0){
        return dispatch(deleteDibSuccess(index));
      }else{

      }
    }
    )
  }
}

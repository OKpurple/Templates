import {
  PROGRAMS,
  PROGRAMS_SUCCESS,
  PROGRAMS_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function programs(){
    return {
      type: PROGRAMS
    }
}

export function programsRequest(){
  return (dispatch)=>{

  };
}

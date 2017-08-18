import {
  OPEN_PROGRAMS,
  OPEN_PROGRAMS_SUCCESS,
  OPEN_PROGRAMS_FAILURE
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

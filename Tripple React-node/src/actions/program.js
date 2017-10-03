import {
  PROGRAMS_LIST,
  PROGRAMS_LIST_SUCCESS,
  PROGRAMS_LIST_FAILURE,
  APPLY_PROGRAM_LIST_SUCCESS,
  APPLY_PROGRAM_LIST_FAILURE,
  SEARCH_PROGRAM_LIST_SUCCESS,
  SEARCH_PROGRAM_LIST,
  CREATE_ROUTES,
  CREATE_MEETING_INFO,
  CREATE_PROGRAM_INFO,
  CREATE_PROGRAM_FAILURE,
  CREATE_PROGRAM_SUCCESS
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
    type: SEARCH_PROGRAM_LIST_SUCCESS,
    data
  };
}

export function createRoutes(data){
  return{
    type: CREATE_ROUTES,
    data
  };
}

export function createMeetingInfo(data){
  return{
    type: CREATE_MEETING_INFO,
    data
  };
}

export function createProgramInfo(data){
  return{
    type: CREATE_PROGRAM_INFO,
    data
  };
}




export function searchProgramListRequest(city, date){
  return (dispatch)=>{
    let url = '/api/openPrograms/search/'+city+'/'+date;
    return axios.get(url)
    .then((res)=>{
      dispatch(searchProgramListSuccess(res.data.data))
    }).catch((err)=>{
      dispatch();
    })
  };
};


export function createProgramFailure(){
    return {
      type: CREATE_PROGRAM_FAILURE
    }
}
export function createProgramSuccess(){
    return {
      type: CREATE_PROGRAM_SUCCESS
    }
}

export function createProgramRequest(data,currentUser) {
    return (dispatch) => {

      var title = data.programInfo.title;
      var startTime = data.programInfo.startTime;
      var endTime = data.programInfo.endTime;
      var participant = data.programInfo.participant;
      var address = data.meetingInfo.address;
      var lng = data.meetingInfo.lng;
      var lat = data.meetingInfo.lat;

      var content = '내용이 아직 없음..'
      var routes = data.routesData;
      var category = data.programInfo.category;
      // {
      //   title,
      //   startTime,
      //   endTime,
      //   participant,
      //   address,
      //   lng,
      //   lat,
      //   content,
      //   routes,
      //   user_id,
      //   category
      // }
      var user_id = currentUser;
      console.log('create action');
      var body = Object.assign(data.programInfo,{routes:data.routesData},data.meetingInfo,{user_id:user_id});

        // API REQUEST
        return axios.post('/api/programs',body ).then((response) => {
            // SUCCEED

            if(response.data.meta.code === -10){
              console.log("INVALID_REQUEST");
            }else{
              console.log("create Program success");
              dispatch(createProgramSuccess());
            }
        }).catch((error) => {
            // FAILED
            dispatch(createProgramFailure());
        });
    };
}

//내가 예약한 프로그램
export function applyProgramListRequest(user_id){
  return (dispatch)=>{
    let url = '/api/openPrograms/'+user_id;

    return axios.get(url)
    .then((response)=>{
      console.log(url);
      dispatch(applyProgramListSuccess(response.data.data))
    }).catch((err)=>{
      dispatch(applyProgramListFailure());
    })
  }
}


//나의 프로그램
export function programListRequest(isInitial, listType, user_id){
  return (dispatch)=>{
    let url = '/api/programs/op/'+user_id;

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
export function applyProgramListFailure(){
  return {
    type : APPLY_PROGRAM_LIST_FAILURE
  }
}

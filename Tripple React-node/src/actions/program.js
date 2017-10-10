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
  CREATE_PROGRAM_SUCCESS,
  GET_PROGRAM_DETAIL_SUCCESS,
  GET_PROGRAM_DETAIL_FAILURE
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

      // var title = data.programInfo.title;
      // var startTime = data.programInfo.startTime;
      // var participant = data.programInfo.participant;
      // var address = data.meetingInfo.address;
      // var lng = data.meetingInfo.lng;
      // var lat = data.meetingInfo.lat;
      // var content = '내용이 아직 없음..'
      // var routes = data.routesData;
      // var category = data.programInfo.category;
      // var formData = data.programInfo.formData;
      // var user_id = currentUser;
      // var price = data.programInfo.price;


        // API REQUEST

      return axios.post('api/programs/uploadImg/'+user_id,formData).then((imgRes)=>{

            var program_url = imgRes.data.program_url;

            var body = Object.assign(
              {program_url:program_url},
              {routes:data.routesData},
              data.meetingInfo,
              data.programInfo,
              {user_id:user_id}
            );

            return axios.post('/api/programs',body).then((response) => {
                    // SUCCEED
                    if(response.data.meta.code === -10){
                      console.log("INVALID_REQUEST");
                    }else{
                      dispatch(createProgramSuccess());
                    }
                }).catch((error) => {
                    // FAILED
                    dispatch(createProgramFailure());
                })

        })




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


//내가 만든 프로그램
export function programListRequest(isInitial, listType, user_id){
  return (dispatch)=>{
    let url = '/api/programs/op/'+user_id;

    return axios.get(url)
    .then((response)=>{
      console.log("여기");
      console.log(response.data.data);
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


//프로그램 상세정보
export function getProgramDetailSuccess(data){
  return {
    type : GET_PROGRAM_DETAIL_SUCCESS,
    data : data
  }
}

export function getProgramDetailFailure(){
  return {
    type : GET_PROGRAM_DETAIL_FAILURE
  }
}


export function getProgramDetail(pid){
  return (dispatch)=>{
    let url ='/api/programs/detail/'+pid
    console.log("actiion")
    return axios.get(url).then((result)=>{
      console.log(result.data.data)
      if(result.data.meta.code == -10){
          console.log('실패');
      }else{

        dispatch(getProgramDetailSuccess(result.data.data));
      }
    }).catch((err)=>{
      dispatch(getProgramDetailFailure());
    })
  }
}

export function resetCreateProgram(){
  return {
    type : RESET_CREATE_PROGRAM
  }
}

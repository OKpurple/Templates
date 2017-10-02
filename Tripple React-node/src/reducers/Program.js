import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    applyList:{
        status:'INIT',
        data: []
    },
    searchList:{
      data: []
    },
    createProgramInfo:{
      status :'INIT',
      routesData:[],
      meetingInfo: Object,
      programInfo:Object
    }
};


export default function Program(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.PROGRAMS_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.PROGRAMS_LIST_SUCCESS:
        //30개면 더이상 보이면 안되기때문에 30미만이면 true
          if(action.isInitial){
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data:{$set: action.data},
                    isLast:{$set: action.data.length < 30 }
                }
            });
          }
          return state;
        case types.PROGRAMS_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.APPLY_PROGRAM_LIST_SUCCESS:
          return update(state, {
            applyList:{
              data:{$set: action.data}
            }
          });
        case types.APPLY_PROGRAM_LIST_FAILURE:
          return update(state, {
            applyList:{
              status:{$set: "FAILURE"}
            }
          });
        case types.SEARCH_PROGRAM_LIST_SUCCESS:

          return update(state, {
            searchList:{
              data:{$set: action.data}
            }
          });
        case types.CREATE_ROUTES:
          return update(state, {
            createProgramInfo:{
              routesData:{$set: action.data}
            }
          });
        case types.CREATE_MEETING_INFO:
          return update(state, {
            createProgramInfo:{
              meetingInfo:{$set: action.data}
            }
          });
        case types.CREATE_PROGRAM_INFO:
          return update(state, {
            createProgramInfo:{
              programInfo:{$set: action.data}
            }
        });
        case types.CREATE_PROGRAM_SUCCESS:
          return update(state, {
            createProgramInfo:{
              status:{$set: "SUCCESS"}
            }
        });
        case types.CREATE_PROGRAM_FAILURE:
          return update(state, {
            createProgramInfo:{
              status:{$set: "FAILURE"}
            }
        });
        default:
            return state;
    }
}

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
        data: []
    },
    searchList:{
      data: []
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
        case types.SEARCH_PROGRAM_LIST_SUCCESS:
          return update(state, {
            searchList:{
              data:{$set: action.data}
            }
          });
        default:
            return state;
    }
}

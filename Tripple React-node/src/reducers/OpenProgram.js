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
    detailInfo:{
      status:'INIT',
      data:{
        programInfo:{},
        userInfo:{},
        routesInfo:[{}],
        reservationInfo:[]
      }
    },
    routes:{
      data : []
    },
    applyOpenStatus:'INIT',
    wishList:{
      status:'INIT',
      data:[]
    }
};


export default function OpenProgram(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
      case types.DELETE_DIB_SUCCESS:
          return update(state, {
              wishList: {
                  data: { $splice: [[action.index,1]] }
              }
          });
      case types.WISH_LIST_SUCCESS:
          return update(state, {
              wishList: {
                  status: { $set : 'SUCCESS' },
                  data: { $set : action.data}
              }
          });
      case types.WISH_LIST_FAILURE:
          return update(state, {
              wishList: {
                  status:{ $set : 'FAILURE' }
              }
          });

        case types.OPEN_PROGRAMS:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.OPEN_PROGRAMS_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.OPEN_PROGRAMS_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.GET_OPEN_PROGRAM_DETAIL_SUCCESS:
            return update(state, {
                detailInfo: {
                   status:{$set: 'SUCCESS' },
                   data:{ $set : action.data }
                 }
            });
        case types.GET_ROUTES_SUCCESS:
            return update(state, {
                routes: {
                   data:{ $set : action.data }
                 }
            });
        case types.APPLY_OPEN_SUCCESS:
            return update(state, {
                applyOpenStatus: { $set : 'SUCCESS' }
            });
        case types.APPLY_OPEN_FAILURE:
            return update(state, {
                applyOpenStatus: { $set : 'FAILURE' }
            });



        default:
            return state;
    }
}

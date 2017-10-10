import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    dib:{
      status:'INIT'
    }

};


export default function Reserve(state = initialState, action) {
    switch(action.type) {
      case types.DIB:
          return update(state, {
              dib: {
                  status: { $set: 'INIT' }
              }
          });
      case types.DIB_SUCCESS:
          return update(state, {
              dib: {
                  status: { $set: 'SUCCESS' }
              }
          });
      case types.DIB_FAILURE:
          return update(state, {
              dib: {
                  status: { $set: 'FAILURE' }
              }
          });
      case types.DELETE_DIB_SUCCESS:
          return update(state, {
              dib: {
                  status: { $set: 'DELETE_SUCCESS' }
              }
          });
      default:
          return state;
      }
}

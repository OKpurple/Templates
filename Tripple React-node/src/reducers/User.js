import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    userProfile:{
      status:'INIT'
    },
    data:{}
};

export default function Login(state = initialState, action) {
    switch(action.type) {
        case types.GET_PROFILE_SUCCESS:
          console.log(action.loginId + " login in reducers")
            return update(state, {
                userProfile: {
                    status: { $set: 'SUCCESS' }
                },
                data: {$set:action.data}
            });
        case types.GET_PROFILE_FAILURE:
            return update(state, {
                userProfile: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;
    }
}

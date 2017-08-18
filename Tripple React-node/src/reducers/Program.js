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
    }
};


export default function Program(state, action) {
    if(typeof state === "undefined") {
        state = initialState;
    }

    switch(action.type) {
        case types.PROGRAMS:
            return update(state, {
                post: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.PROGRAMS_SUCCESS:
        //30개면 더이상 보이면 안되기때문에 30미만이면 true
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' },
                    data:{$set: action.data},
                    isLast:{$set: action.data.length < 30 }
                }
            });
        case types.PROGRAMS_FAILURE:
            return update(state, {
                post: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}

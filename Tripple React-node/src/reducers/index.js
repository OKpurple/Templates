import Login from './Login';
import OpenProgram from './OpenProgram';
import Program from './Program';
import User from './User';
import Reserve from './Reserve';
import { combineReducers } from 'redux';

export default combineReducers({
    Login,
    OpenProgram,
    Program,
    User,
    Reserve
});

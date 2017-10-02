import React, { Component, PropTypes } from 'react';
import {InputGuide} from '../components';
import { NavLink } from 'react-router-dom';

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='col s9'>
          <div className='row col s12'>
            <InputGuide/>
          </div>
          <div className='row col s12'>
            <NavLink to='/MyPage'><button className="btn col s1 offset-s2 marginT waves-effect waves-light green lighten-3">뒤로</button></NavLink>
            <button className="btn col s1 offset-s2 marginT waves-effect waves-light green lighten-3">저장</button>
          </div>
          </div>
        );
    }
}

export default ProfileEdit;

import React, { Component, PropTypes } from 'react';
import {SideNav, Profile} from '../components/';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class MyPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='row marginT'>
            <SideNav />
            <Profile />
            <div className= 'col s1 offset-s6'>
              <NavLink to='/'><button className="btn right marginT waves-effect waves-light red lighten-3">수정</button></NavLink>

            </div>
          </div>
        );
    }
}
MyPage.propTypes = propTypes;
MyPage.defaultProps = defaultProps;
export default MyPage;

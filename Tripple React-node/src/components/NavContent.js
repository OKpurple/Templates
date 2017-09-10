import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class NavContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(

            <div className="nav-content">
              <div className="tabs tabs-transparent">
                <NavLink to = "/WishList" className="tab right"><a>위시리스트</a></NavLink>
                <NavLink to = "/TravelList" className="tab right"><a>여행하기</a></NavLink>
                <NavLink to = "/CreateProgram" className="tab right"><a>프로그램 만들기</a></NavLink>

              </div>
            </div>

        );
    }
}
NavContent.propTypes = propTypes;
NavContent.defaultProps = defaultProps;
export default NavContent;

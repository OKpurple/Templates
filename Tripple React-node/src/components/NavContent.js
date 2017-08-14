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
          <div>
            <div className="nav-content">
              <div className="tabs tabs-transparent">

                <div className="tab red right">
                  <select className="tab right">
                    <option>option1</option>
                    <option>option2</option>
                  </select>
                </div>

                <NavLink to = "/" className="tab right"><a>내 프로그램</a></NavLink>
                <NavLink to = "/" className="tab right"><a>신청 현황</a></NavLink>
                <NavLink to = "/" className="tab right"><a>가이드 등록</a></NavLink>

              </div>
            </div>
          </div>
        );
    }
}
NavContent.propTypes = propTypes;
NavContent.defaultProps = defaultProps;
export default NavContent;

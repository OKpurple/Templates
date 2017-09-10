import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class SideNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {

      const SideBar = (



            <div >
                <NavLink to = "/MyPage" ><h3 className='center'>프로필</h3></NavLink>
                
                <NavLink to = "/MyTrip" ><h3 className='center'>나의 여행</h3></NavLink>

                <NavLink to = "/Review" ><h3 className='center'>후기</h3></NavLink>
            </div>


      )

        return(
          <div>
          <div className="col s3">
            {SideBar}

            </div>
          </div>
        );
    }
}
SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;
export default SideNav;

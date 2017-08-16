import React, { Component, PropTypes } from 'react';
import { GoogleMap,RoutesPlan,MeetingPlace } from '../components';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
class CreateMeetPlace extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div>
            <h3 className='center'>2. 모임 위치 등록</h3>
            <div className = 'row'>
              <GoogleMap/>
              <MeetingPlace/>
              <div className='col s8 offset-s2'>
                <NavLink to='/CreateDetail'><button className="btn right marginT waves-effect waves-light red lighten-3">다음</button></NavLink>
                <NavLink to='/CreateProgram'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></NavLink>
              </div>
            </div>
          </div>
        );
    }
}
CreateMeetPlace.propTypes = propTypes;
CreateMeetPlace.defaultProps = defaultProps;
export default CreateMeetPlace;

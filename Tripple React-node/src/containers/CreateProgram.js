import React, { Component, PropTypes } from 'react';
import { GoogleMap,RoutesPlan } from '../components';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
class CreateProgram extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
            <h3 className='center'>1. 장소 등록</h3>
            <div className = 'row'>
              <GoogleMap/>
              <RoutesPlan/>
              <div className = 'col s8 offset-s2 '>
                <NavLink to='/CreateMeetPlace'><button className="btn right marginT waves-effect waves-light red lighten-3">다음</button></NavLink>
              </div>
            </div>
          </div>
        );
    }
}
CreateProgram.propTypes = propTypes;
CreateProgram.defaultProps = defaultProps;
export default CreateProgram;

import React, { Component, PropTypes } from 'react';
import {SideNav} from '../components/';
import { connect } from 'react-redux';
import { getProfile } from '../actions/user';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Profile,MyTrip,Review,ProfileEdit,MyGuideDetail,OpenProgram } from '../containers';
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
            <div className='col s3'>
              <SideNav />
            </div>

            <div className='col s9'>
              <Switch>
                  <Route exact path="/MyPage" component={Profile}/>
                  <Route exact path="/MyPage/MyTrip/MyGuide/:pid" component={MyGuideDetail}/>
                  <Route exact path="/MyPage/MyTrip" component={MyTrip}/>
                  <Route exact path="/MyPage/Review" component={Review}/>
                  <Route exact path="/MyPage/ProfileEdit" component={ProfileEdit}/>
              </Switch>
            </div>


          </div>

        );
    }
}

export default MyPage;

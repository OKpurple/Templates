import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getProfile } from '../actions/user';
const propTypes = {
};
const defaultProps = {
};
class Profile extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
      this.props.getProfile(this.props.currentUser);
    }
    render() {



        return(
          <div className='col s9'>
              <div className='row '>
                  <div className="col s2 offset-s1">
                      <h2>나의 프로필</h2>
                  </div>
              </div>
              <div className='row col s12'>
                  <div className="col s2 offset-s1">
                      <img src="https://s3.ap-northeast-2.amazonaws.com/altenull/profile1.jpg" className="responsive-img circle" />
                  </div>
                  <div className='col s6 offset-s1 z-depth-4'>
                  <h3>{this.props.profileInfo.firstName} {this.props.profileInfo.lastName}</h3>
                  <p>{this.props.profileInfo.email}</p>
                  <p>0{this.props.profileInfo.phone}</p>
                  <p>{this.props.profileInfo.sex}</p>
                  <p>{this.props.profileInfo.birth}</p>
                  <p>{this.props.profileInfo.nation}</p>
                  </div>
              </div>

              <div className='row'>
                <div className= 'col s1 offset-s6'>
                  <NavLink to='/MyPage/ProfileEdit'><button className="btn right marginT waves-effect waves-light green lighten-3">수정</button></NavLink>
                </div>
              </div>
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser : state.Login.status.currentUser,
        status: state.User.userProfile.status,
        profileInfo : state.User.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (user_id) => {
            return dispatch(getProfile(user_id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

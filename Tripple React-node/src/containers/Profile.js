import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getProfile } from '../actions/user';
import { GuideInfo } from '../components'
const propTypes = {
};
const defaultProps = {
};
class Profile extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){


        this.props.getProfile(this.props.currentUser).then(()=>{
            console.log('get Profile');
          console.log(this.props.profileInfo)
        })
    }
    render() {



        return(
          <div>
              <div className='row'>
                <div className='cos s9'><h2>나의 프로필</h2></div>
              </div>

              <div className='row'>
                <GuideInfo profileInfo = {this.props.profileInfo}/>
              </div>

              <div className='row'>
                <div className= 'col s1 offset-s8'>
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

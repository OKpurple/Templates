import React, { Component, PropTypes } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../actions/user';
const propTypes = {
};
const defaultProps = {
};
class InputGuide extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
      this.props.getProfile(this.props.currentUser);
    }


    render() {
        return(
          <div className='col s6 offset-s1'>
              <h4>가이드 정보</h4>
                <div className="row">
                  <div className="input-field col s5">
                    <input defaultValue={this.props.profileInfo.firstName} id="first_name" type="text" className="validate"/>
                    <label className='active' htmlFor="first_name">First Name</label>
                  </div>
                  <div className="input-field col s7">
                    <input defaultValue={this.props.profileInfo.lastName} id="last_name" type="text" className="validate"/>
                    <label className='active' htmlFor="last_name">Last Name</label>
                  </div>
                </div>




                <div className="row">
                  <div className="input-field col s12">
                    <input defaultValue={this.props.profileInfo.phone} id="phonenum" type="text" className="validate"/>
                    <label className='active' htmlFor="phonenum">연락 가능한 전화번호를 적어주세요.</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input defaultValue={this.props.profileInfo.email} id="emailValue" type="email" className="validate"/>
                    <label className='active' htmlFor="emailValue">Tripple@exam.com</label>
                  </div>
                </div>

                <div className="row">
                  <div className='col s12'>
                   <span>
                     <input type="checkbox"  id="korean" defaultChecked="checked" />
                     <label htmlFor="korean" >한국어</label>
                   </span>

                   <span style={{margin:'1cm'}}>
                     <input type="checkbox" id="english" />
                     <label htmlFor="english">영어</label>
                   </span>
                   <span>
                     <input type="checkbox" id="japanese" />
                     <label htmlFor="japanese">일본어</label>
                   </span>
                   <span style={{margin:'1cm'}}>
                     <input type="checkbox" id="etc" />
                     <label htmlFor="etc">기타</label>
                   </span>
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
export default connect(mapStateToProps, mapDispatchToProps)(InputGuide);

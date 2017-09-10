import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const propTypes = {
};
const defaultProps = {
};
class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {




      const profile = (

          /*<div className='red col s9' id='aa'>*/
          <div>
            <form className="col s12 ">





                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="name" type="text" className="validate"/>
                    <label for="name" className='purple-text'>이름</label>
                  </div>
                  <div className="input-field col s4">
                    <input id="first_name" type="text" className="validate"/>
                    <label for="first_name">First Name (성)</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last_name" type="text" className="validate"/>
                    <label for="last_name">Last Name (이름)</label>
                  </div>
                </div>

                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="phone" type="text" className="validate"/>
                    <label for="phone" className='purple-text'>전화번호</label>
                  </div>
                  <div className="input-field col s4">
                    <input id="phonenum" type="text" className="validate"/>
                    <label for="phonenum">연락 가능한 전화번호를 적어주세요.</label>
                  </div>
                  <div className='input-field col s2'>
                    <input disabled id="sex" type="text" className="validate"/>
                    <label for="sex" className='purple-text'>성별</label>
                  </div>
                  <div className="input-field col s4">
                    <input id="sex" type="text" className="validate"/>
                    <label for="sex_gender">성별</label>
                  </div>
                </div>

                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="email" type="text" className="validate"/>
                    <label for="email" className='purple-text'>Email</label>
                  </div>
                  <div className="input-field col s10">
                    <input id="emailValue" type="email" className="validate"/>
                    <label for="emailValue">Tripple@exam.com</label>
                  </div>
                </div>

                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="lang" type="text" className="validate"/>
                    <label for="lang" className='purple-text'>Language</label>
                  </div>
                  <div className="input-field col s10">
                    <input id="langValue" type="email" className="validate"/>
                    <label for="langValue">한국어, 영어, ...</label>
                  </div>
                </div>

                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="password" type="text" className="validate"/>
                    <label for="password" className='purple-text'>비밀번호</label>
                  </div>
                  <div className="input-field col s4">
                    <input id="password_input" type="password" className="validate"/>
                    <label for="password_input">비밀번호</label>
                  </div>
                  <div className='input-field col s2'>
                    <input disabled id="password_check" type="text" className="validate"/>
                    <label for="password_check" className='purple-text'>비밀번호 확인</label>
                  </div>
                  <div className="input-field col s4">
                    <input id="password_check_input" type="password" className="validate"/>
                    <label for="password_check_input">비밀번호 확인</label>
                  </div>
                </div>

                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="introduce" type="text" className="validate"/>
                    <label for="introduce" className='purple-text'>자기소개</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="introduce_area" type="textarea"  className="validate"/>

                  </div>
                </div>
            </form>

          </div>

      )

        return(
          <div className="col s8">

            {profile}

          </div>
        );
    }
}
Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;
export default Profile;

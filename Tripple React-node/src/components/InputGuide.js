import React, { Component, PropTypes } from 'react';
import {NavLink} from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class InputGuide extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div>
          <div className="row">
            <form className="col s8 offset-s2">
              <h5>가이드(본인) 정보</h5>
                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="name" type="text" className="validate"/>
                    <label for="name" className='purple-text'>이름</label>
                  </div>
                  <div className="input-field col s4">
                    <input id="first_name" type="text" className="validate"/>
                    <label for="first_name">First Name</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last_name" type="text" className="validate"/>
                    <label for="last_name">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className='input-field col s2'>
                    <input disabled id="phone" type="text" className="validate"/>
                    <label for="phone" className='purple-text'>전화번호</label>
                  </div>
                  <div className="input-field col s10">
                    <input id="phonenum" type="password" className="validate"/>
                    <label for="phonenum">연락 가능한 전화번호를 적어주세요.</label>
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
            </form>

          </div>

        </div>
        );
    }
}
InputGuide.propTypes = propTypes;
InputGuide.defaultProps = defaultProps;
export default InputGuide;

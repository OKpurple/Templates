import React, { Component, PropTypes } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../actions/user';
import {label,select,Button } from 'react-bootstrap';

const propTypes = {
};
const defaultProps = {
};
class InputGuide extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstName:this.props.profileInfo.firstName,
      lastName:this.props.profileInfo.lastName,
      phone:this.props.profileInfo.phone,
      email:this.props.profileInfo.email,
      birth:this.props.profileInfo.birth,
      sex:this.props.profileInfo.sex,
      nation:this.props.profileInfo.nation,
      languages:this.props.profileInfo.languages,
      profile_text:this.props.profileInfo.profile_text
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
    componentWillMount(){
      this.props.getProfile(this.props.currentUser);
      console.log('cwm');
      console.log(this.state);
    }
    handleUpdate(){
      console.log(this.state);
      this.props.onUpdateProfile(this.state);
    }


    handleChange(e) {
        let nextState = {};
        if(e.target.name==='languages'){
          if(e.target.checked){
            nextState[e.target.name] = e.target.id;
            console.log(nextState);
          }else{
            nextState[e.target.name] = '';
            console.log(nextState);
          }
        }else{
          nextState[e.target.name] = e.target.value;
          console.log(nextState);
        }
        this.setState(nextState);
    }
    render() {
        return(
          <div className='row'>
            <div className='col s9'>
            <div className='row'>
              <h4>가이드 정보</h4>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input defaultValue={this.state.profile_text} name='profile_text' onChange={this.handleChange} id="profile_text" type="text" className="validate"/>
                <label className='active' htmlFor="profile_text">한줄 자기 소개!</label>
              </div>
            </div>



                <div className='row'>
                  <div className="input-field col s5">
                    <input defaultValue={this.state.firstName} name='firstName' onChange={this.handleChange} id="first_name" type="text" className="validate"/>
                    <label className='active' htmlFor="first_name">First Name</label>
                  </div>
                  <div className="input-field col s7">
                    <input defaultValue={this.state.lastName} name='lastName' onChange={this.handleChange} id="last_name" type="text" className="validate"/>
                    <label className='active' htmlFor="last_name">Last Name</label>
                  </div>
                </div>




                <div className="row">
                  <div className="input-field col s12">
                    <input defaultValue={this.state.phone} name='phone' onChange={this.handleChange} id="phonenum" type="text" data-length="11"/>
                    <label className='active' htmlFor="phonenum">연락 가능한 전화번호를 적어주세요.</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input defaultValue={this.state.email} name='email' onChange={this.handleChange} id="emailValue" type="email" className="validate"/>
                    <label className='active' htmlFor="emailValue">Tripple@exam.com</label>
                  </div>
                </div>



                <div className="row">
                  <div className='col s12'>
                   <span>
                     <input type="checkbox" name='languages' onChange={this.handleChange} id="한국어"/>
                     <label htmlFor="한국어" >한국어</label>
                   </span>

                   <span style={{margin:'1cm'}}>
                     <input name='languages' onChange={this.handleChange} type="checkbox" id="영어" />
                     <label htmlFor="영어">영어</label>
                   </span>
                   <span>
                     <input name='languages' onChange={this.handleChange} type="checkbox" id="일본어" />
                     <label htmlFor="일본어">일본어</label>
                   </span>
                   <span style={{margin:'1cm'}}>
                     <input name='languages' onChange={this.handleChange} type="checkbox" id="etc" />
                     <label htmlFor="etc">기타</label>
                   </span>
                   </div>
                </div>

                <div className="row form-group">
                  <div className='col s2'>
                  <label>성별</label> </div>
                  <div className=" col s10">
                    <select defaultValue={this.state.sex} name='sex' onChange={this.handleChange} id='sex' className='form-control'>
                      <option>남자</option>
                      <option>여자</option>
                    </select>
                  </div>
                </div>

                <div className="row form-group">
                  <div className='col s2'>
                  <label>nation</label> </div>
                  <div className=" col s10">
                    <select defaultValue={this.state.nation} name='nation' onChange={this.handleChange} id='nation' className='form-control'>
                      <option>한국</option>
                      <option>USA</option>
                    </select>
                  </div>
                </div>




                <div className='row'>
                  <div className='col s2'>
                  <label>birth</label> </div>
                  <div className=" col s10">
                    <input name='birth' value={this.state.birth} onChange={this.handleChange} type='date'/>
                  </div>
                </div>

                <div className='row'>
                  <div className= 'col s1 offset-s11'>
                    <a className='btn' onClick={this.handleUpdate}>저장</a>
                  </div>
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

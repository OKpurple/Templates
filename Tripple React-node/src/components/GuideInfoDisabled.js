import React, { Component, PropTypes } from 'react';
import {label,select,Button } from 'react-bootstrap';


class GuideInfoDisabled extends Component {
  constructor(props) {
    super(props);
  }

    render() {
        return(
          <div className='col s6 offset-s1'>
              <h4>가이드 정보</h4>
              <div className="row">
                <div className='col s2'>
                <label>이름</label> </div>
                <div className=" col s10">
                  <span>{this.props.profileInfo.fistName} {this.props.profileInfo.lastName}</span>
                </div>
              </div>

              <div className="row">
                <div className='col s2'>
                <label>전화번호</label> </div>
                <div className=" col s10">
                  <span>{this.props.profileInfo.phone}</span>
                </div>
              </div>

              <div className="row">
                <div className='col s2'>
                <label>email</label> </div>
                <div className=" col s10">
                  <span>{this.props.profileInfo.email}</span>
                </div>
              </div>

              <div className="row">
                <div className='col s2'>
                <label>언어</label> </div>
                <div className=" col s10">
                  <span>{this.props.profileInfo.languages}</span>
                </div>
              </div>


                <div className="row">
                  <div className='col s2'>
                  <label>성별</label> </div>
                  <div className=" col s10">
                    <span>{this.props.profileInfo.sex}</span>
                  </div>
                </div>

                <div className="row">
                  <div className='col s2'>
                  <label>nation</label> </div>
                  <div className=" col s10">
                    <span>{this.props.profileInfo.nation}</span>
                  </div>
                </div>

                <div className="row">
                  <div className='col s2'>
                  <label>birth</label> </div>
                  <div className=" col s10">
                    <span>{this.props.profileInfo.birth}</span>
                  </div>
                </div>



        </div>
        );
    }
}
export default GuideInfoDisabled;

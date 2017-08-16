import React, { Component, PropTypes } from 'react';
import {NavLink} from 'react-router-dom';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const propTypes = {
};
const defaultProps = {
};
class InputProgram extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
      
        const script = document.createElement('script');
        script.text=`
        $('.timepicker').pickatime({
         default: 'now',
         fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
         twelvehour: false, // Use AM/PM or 24-hour format
         donetext: 'OK', // text for done-button
         cleartext: 'Clear', // text for clear-button
         canceltext: 'Cancel', // Text for cancel-button
         autoclose: false, // automatic close timepicker
         ampmclickable: true, // make AM PM clickable
         aftershow: function(){} //Function for after opening timepicker
        });






        `
        this.instance.appendChild(script);
    }

    render() {
        return(
            <div ref={el => (this.instance = el)}>

            <div className="row">
              <form className="col s8 offset-s2">
                <h5>기본 정보</h5>
                  <div className="row">
                    <div className='input-field col s2'>
                      <input disabled id="title" type="text" className="validate"/>
                      <label for="title" className='purple-text'>제목</label>
                    </div>
                    <div className="input-field col s10">
                      <input id="titleVal" type="text" className="validate"/>
                      <label for="titleVal">우리동네에서 만나요.</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className='input-field col s2'>
                      <input disabled id='startTime' type="text" className="validate"/>
                      <label for="startTime" className='purple-text'>시작 시간</label>
                    </div>
                    <div className="input-field col s2">
                      <input id="startTimeVal" type="text" className="timepicker"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className='input-field col s2'>
                      <input disabled id='endTime' type="text" className="validate"/>
                      <label for="endTime" className='purple-text'>종료 시간</label>
                    </div>
                    <div className="input-field col s2">
                      <input id="endTimeVal" type="text" className="timepicker"/>
                    </div>
                  </div>

                  <div className="row">
                    <div className='input-field col s2'>
                      <input disabled id='participantMax' type="text" className="validate"/>
                      <label for="participantMax" className='purple-text'>최대 인원</label>
                    </div>
                    <div className="input-field col s2">
                      <input id="participantMaxVal" type='number' className="validate"/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="file-field input-field col s12">
                      <div className="btn col s2 red">
                        <span>선택</span>
                        <input type="file" multiple/>
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="대표사진을 올려주세요"/>
                      </div>
                    </div>
                  </div>
                  <br/><hr/><br/>
              </form>


            </div>

              <div className="row">
                <form className="col s8 offset-s2">
                  <h5>상세정보</h5>
                  <div className="row">
                    <div className='input-field col s2'>
                      <input disabled id="theme" type="text" className="validate"/>
                      <label for='theme' className='purple-text'>테마</label>
                    </div>
                    <div className="input-field col s10">
                      <select multiple className='selectmulti'>
                        <option value="1">맛집 탐방</option>
                        <option value="2">문화재 탐방</option>
                        <option value="3">로컬 푸드</option>
                      </select>
                      <label>테마를 선택해주세요</label>
                    </div>
                  </div>
                  <div className='row'>
                  </div>

                </form>

              </div>



            </div>


        );
    }
}
InputProgram.propTypes = propTypes;
InputProgram.defaultProps = defaultProps;
export default InputProgram;

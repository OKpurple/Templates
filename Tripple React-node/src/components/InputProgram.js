import React, { Component, PropTypes } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
//import TimePicker from 'material-ui/TimePicker';
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

const propTypes = {
};
const defaultProps = {
};
class InputProgram extends Component {
    constructor(props) {
        super(props);

        this.handleImgFile = this.handleImgFile.bind(this);
    }

    handleImgFile(e){
      var img = new Image();
      img.src = URL.createObjectURL(e.target.files[0]);
      img.width = 500;
      img.height =400;
      this.mt.appendChild(img);

      var formData = new FormData();
      var myData = document.getElementById('program_img').files[0];

      formData.append("program_img",myData);

      this.props.handleImg(formData);
    }


    componentDidMount(){
       this.$el = $(this.el);
       this.$el1 = $(this.el1);
       this.$cate = $(this.cate);
      this.$el.pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
      });
      this.$el1.pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
      });

      this.$cate.material_chip({
        placeholder: '카테코리 ex) 맛집탐방'
      });

    }

    render() {
        return(
            <div className='col s6 offset-s1'>
              <h4>프로그램 정보</h4>


                  <div className="row">
                    <div className="input-field col s12">
                      <input defaultValue={this.props.cPI.title} id="title" type="text" className="validate"/>
                      <label className='active' htmlFor="title">Title</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input defaultValue={this.props.cPI.startTime} id="startTime" type="text" className="timepicker" ref={el => this.el = el}/>
                      <label className='active' htmlFor="startTime" >시작 시간</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s5">
                      <input defaultValue={this.props.cPI.participant} id="participant" type='number' className="validate"/>
                      <label className='active' htmlFor="participant" >최대 인원</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s5 kor-sign">
                      <input defaultValue={this.props.cPI.price} step='1000' id="price" type='number' className="validate"/>
                      <label className='active' htmlFor="price" >참가비</label>
                    </div>
                  </div>

                  <div className='row'>
                    <div id ="category" className="chips chips-placeholder col s12" ref = {el => this.cate = el}></div>
                  </div>

                  <div className='row' ref={ mt => this.mt = mt}>
                    <label className='col s1'>프로그램 대표사진</label>
                    <input className='col s11' encType="multipart/form-data" type='file' id='program_img' name='program_img' onChange={this.handleImgFile}/>
                  </div>
             </div>


        );
    }
}
InputProgram.propTypes = propTypes;
InputProgram.defaultProps = defaultProps;
export default InputProgram;

import React, { Component, PropTypes } from 'react';
import { GuideInfoDisabled , InputProgram,InputGuide} from '../components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    createProgramInfo
} from '../actions/program';


class CreateDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
          formData:''
        }
        this.handleNext = this.handleNext.bind(this);
        this.handleImg = this.handleImg.bind(this);
    }

    componentDidMount(){
      console.log(this.props.createProgramInfo.meetingInfo.address);
      console.log(this.props.createProgramInfo.routesData);
    }

    handleImg(data){
      this.setState({formData : data});
    }


    handleNext(){
      var programInfo = new Object();

      var category = [];
      var language = [];
      this.$cate = $(document.getElementById('category'));
      this.$cate.material_chip('data').forEach((cate)=>{
        category.push(cate.tag);
      });

      programInfo.category = category;
      programInfo.title = document.getElementById('title').value;
      programInfo.startTime = document.getElementById('startTime').value;
      programInfo.participant = document.getElementById('participant').value;
      programInfo.price = document.getElementById('price').value;
      programInfo.formData = this.state.formData;

      if(programInfo.title.trim = ''){
        alert('제목 입력')
      }else{

        this.props.updateProgramInfo(programInfo);
        this.props.history.push('/Program');
      }
    }
    render() {
        return(
            <div>
              <h3 className='center'>3. 프로그램 기본 정보</h3>
              <div className="row">
                <InputProgram cPI={this.props.createProgramInfo.programInfo} handleImg={this.handleImg} user_id = {this.props.currentUser}/>
                <GuideInfoDisabled profileInfo={this.props.profileInfo}/>

                <div className= 'col s8 offset-s2'>
                  <button className="btn right marginT waves-effect waves-light red lighten-3" onClick={this.handleNext}>다음</button>
                  <NavLink to='/CreateMeetPlace'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></NavLink>
                </div>
              </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        createProgramInfo: state.Program.createProgramInfo,
        profileInfo : state.User.data,
        currentUser : state.Login.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    updateProgramInfo: (info) => {
      return dispatch(createProgramInfo(info));
    }

  };
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateDetail);

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
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount(){
      console.log(this.props.createProgramInfo.meetingInfo.address);
      console.log(this.props.createProgramInfo.routesData);
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
      programInfo.endTime = document.getElementById('endTime').value;
      programInfo.participant = document.getElementById('participant').value;
      console.log(category)

      this.props.updateProgramInfo(programInfo);
      this.props.history.push('/CreatePDetail');
    }
    render() {
        return(
            <div>
              <h3 className='center'>3. 프로그램 기본 정보</h3>
              <div className="row">
                <InputProgram cPI={this.props.createProgramInfo.programInfo}/>
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
        profileInfo : state.User.data

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

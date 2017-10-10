import React, { Component, PropTypes } from 'react';
import { GoogleMap,RoutesPlan } from '../components';
import { connect } from 'react-redux';
import {
    createRoutes,
    resetCreateProgram
} from '../actions/program';
import {NavLink} from 'react-router-dom';

class CreateProgram extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    componentWillMount(){
      if(this.props.status == 'SUCCESS'){
        this.props.resetCreateProgram();
      }
    }
    handleNext(rows){
      var routes = new Array();

      for(var i=1; i<rows.length; i++){
          var route = new Object();
          route.order = rows[i].cells[0].innerHTML;
          route.placeName = rows[i].cells[1].innerHTML;
          route.routeTime = rows[i].cells[2].innerHTML;
          route.lat = rows[i].coordi.lat();
          route.lng = rows[i].coordi.lng();
          routes.push(route);
      }

      if(routes.length == 0){
        alert('Spot을 한개 이상 선택 해 주세요.');
      }else{
        //state update
         this.props.createRoutes(routes);
         this.props.history.push('/CreatePDetail');
       }
    }


    render() {
      const email = (
        <div className='heightFull center-align'>

          <p className='marginT'>이메일 인증을 해주세요.</p>
          <NavLink to ='/MyPage'>프로필 수정</NavLink>
        </div>
      )
        return(
          <div>
            <h3 className='center'>1. 장소 등록</h3>
            <div>
              {this.props.userInfo.email == '@tripple.com' ? email : <GoogleMap onNext={this.handleNext}/>}

            </div>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        routesData: state.Program.createProgramInfo.routesData,
        status: state.Program.createProgramInfo.status,
        userInfo: state.User.data
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    createRoutes: (routes) => {
      return dispatch(createRoutes(routes));
    },
    resetCreateProgram:()=>{
      return dispatch(resetCreateProgram);
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgram);

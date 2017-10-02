import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {createProgramRequest} from '../actions/program'
class Program extends Component {
    constructor(props) {
        super(props);
        this.handleCreateProgram=this.handleCreateProgram.bind(this);
    }
    componentWillMount(){
      console.log(this.props.currentUser);
    }
    handleCreateProgram(){
      this.props.createProgramRequest(this.props.cPI,this.props.currentUser).then(()=>{
        if(this.props.cPI.status === "SUCCESS"){
          this.props.history.push('/');
          alert("등록되었습니다.");
        }else{
          alert("실패 : 글을 확인 해보세요.");
        }
      });
    }
    render() {
      const routesbody = (routes)=>{
        return routes.map((route)=>{
          return(
            <tr key ={route.order}>
              <td>{route.order}</td>
              <td>{route.placeName}</td>
              <td>{route.explanation}</td>
              <td>{route.lng},{route.lat}</td>
              <td>{route.routeTime}분</td>
            </tr>
          )
        })
      }

        return(
          <div className='row'>
            <h3 className='center'>최종 확인</h3>
            <div className='col s8 offset-s1'>
              <h4>{this.props.cPI.programInfo.title}</h4>
              <p>수용인원 : {this.props.cPI.programInfo.participant}</p>
              <p>모임장소 : {this.props.cPI.meetingInfo.address}</p>
              <p>모임시간 : {this.props.cPI.meetingInfo.time}</p>
              <p>이름 : {this.props.cPI.programInfo.lastName}{this.props.cPI.programInfo.firstName}</p>
              <p>email : {this.props.cPI.programInfo.emailValue}</p>
              <p>핸드폰 : {this.props.cPI.programInfo.phonenum}</p>
              <p>언어 : {this.props.cPI.programInfo.language}</p>
              <p>시간 : {this.props.cPI.programInfo.startTime}-{this.props.cPI.programInfo.endTime}</p>
              <p>카테고리 : {this.props.cPI.programInfo.category}</p>

              <table>
                <thead><tr>
                <td>순서</td><td>장소명</td><td>내용</td><td>위치</td><td>소요시간</td>
                </tr></thead>
                <tbody>
                  {routesbody(this.props.cPI.routesData)}
                </tbody>
              </table>
            </div>


            <div className= 'row'>
              <div className= 'col s8 offset-s2'>
              <NavLink to='/CreatePDetail'><button className="btn marginR waves-effect waves-light red lighten-3">이전</button></NavLink>
              <button className="btn marginL waves-effect waves-light red lighten-3" onClick={this.handleCreateProgram}>등록</button>
              </div>
            </div>
          </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        cPI: state.Program.createProgramInfo,
        currentUser:state.Login.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    createProgramRequest: (data,user_id) => {
      return dispatch(createProgramRequest(data,user_id));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Program);

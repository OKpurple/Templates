import React, { Component, PropTypes } from 'react';
import {SideNav} from '../components/';
import { programListRequest,applyProgramListRequest } from '../actions/program';
import { connect } from 'react-redux';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import {MyGuide, MyReservedTravel} from '../components/';
import { applyOpen } from '../actions/openProgram'

class MyTrip extends Component {
    constructor(props) {
        super(props);
        this.MyProgramDetail = this.MyProgramDetail.bind(this);
        this.MyProgramOpen = this.MyProgramOpen.bind(this);
    }

    componentWillMount(){
      //내가만든 프로그램
      this.props.programListRequest(true,"new",this.props.currentUser).then(
        () => {
          console.log(this.props.programData);
         }
       );
      //내가 예약한 프로그램
      this.props.applyProgramListRequest(this.props.currentUser).then(
        () => {
          console.log(this.props.applyProgramData);
        }
     );

   }

      MyProgramDetail(program_id){
        console.log("mytirp id = "+program_id)
        this.props.history.push('/MyPage/MyTrip/MyGuide/'+program_id);
      }

      MyProgramOpen(program_id,date){
        this.props.applyOpen(program_id,date).then(()=>{
          this.props.programListRequest(true,"new",this.props.currentUser).then(()=>{
            if(this.props.applyOpenStatus=='SUCCESS'){
              this.setState({openRequest:true})
              alert('오픈했어요!')
              //페이지 리렌더링 해야함
            }else{
              alert('ㅜㅜ 안댔어')
            }
          })
        })
      }
    render() {
      console.log("render");
        return(
          <div className='row'>
            <div className="col s8 ">
              <h3> 나의 여행 페이지</h3>


                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="내가 만든 여행">
                    <MyGuide data={this.props.programData} onMyProgramDetail={this.MyProgramDetail} onOpenProgram={this.MyProgramOpen}/>
                  </Tab>
                  <Tab eventKey={2} title="내가 예약한 여행">
                    <MyReservedTravel data={this.props.applyProgramData} />
                  </Tab>

                </Tabs>
            </div>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.Login.status.isLoggedIn,
        currentUser: state.Login.status.currentUser,
        programData: state.Program.list.data,
        applyProgramData : state.Program.applyList.data,
        applyOpenStatus : state.OpenProgram.applyOpenStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        programListRequest: (isInitial, listType, id) => {
            return dispatch(programListRequest(isInitial, listType, id));
        },
        applyProgramListRequest: (id)=>{
            return dispatch(applyProgramListRequest(id));
        },
        applyOpen:(pid,openDate)=>{
          return dispatch(applyOpen(pid,openDate))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);

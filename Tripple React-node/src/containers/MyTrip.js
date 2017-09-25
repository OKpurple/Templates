import React, { Component, PropTypes } from 'react';
import {SideNav} from '../components/';
import { programListRequest,applyProgramListRequest } from '../actions/program';
import { connect } from 'react-redux';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import {MyGuide, MyReservedTravel} from '../components/';




class MyTrip extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
      console.log(this.props.currentUser);
           this.props.programListRequest(true,"new",this.props.currentUser).then(
               () => {

                   console.log(this.props.programData);
               }
           );
           this.props.applyProgramListRequest(this.props.currentUser).then(
              () => {
                console.log(this.props.applyProgramData);
                console.log('apply');
              }
           );
           console.log("componentDidMount");
       }

    render() {
        return(
          <div className='row'>
            <SideNav />
            <div className="col s8 ">
              <h3> 나의 여행 페이지</h3>


                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="내가 만든 여행">
                    <MyGuide data={this.props.programData}/>
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
        applyProgramData : state.Program.applyList.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        programListRequest: (isInitial, listType, id) => {
            return dispatch(programListRequest(isInitial, listType, id));
        },
        applyProgramListRequest: (id)=>{
            return dispatch(applyProgramListRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);

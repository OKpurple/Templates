import React, { Component, PropTypes } from 'react';
import { GoogleMap, ProgramDetailContents, ProgramDetailGuideInfo} from '../components';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';
import {getOpenProgramDetail} from '../actions/openProgram'
import {connect} from 'react-redux'

class ProgramDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataStatus : false
        }
    }

    componentWillMount(){
      let opid = this.props.match.params.open_program_id;
      console.log('programDetail');
      this.props.getOpenProgramDetail(opid).then(()=>{
        this.setState({dataStatus:true})
        console.log("opid ="+opid);
          console.log(this.props.detailInfo);
      })
    }

    render() {
        return(
          <div className="container ">
          <div className="row ">

          <div className="col s10 offset-s1">
            {this.state.dataStatus ?  <ProgramDetailContents detailInfo={this.props.detailInfo} opid={this.props.match.params.open_program_id}/> : <div>"loading" </div>}
            {this.state.dataStatus ? <ProgramDetailGuideInfo detailInfo={this.props.detailInfo}/>: <div>"loading" </div>}
          </div>

          </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        detailInfo: state.OpenProgram.detailInfo.data, //status.리듀서네임.속성속성,
        currentUser:state.Login.status.currentUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOpenProgramDetail: (opid) => {
            return dispatch(getOpenProgramDetail(opid));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProgramDetail);

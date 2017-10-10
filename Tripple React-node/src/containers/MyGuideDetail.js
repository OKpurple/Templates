import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import  { getProgramDetail }  from '../actions/program'
import {MyProgramDetailContents,ProgramDetailContents, ProgramDetailGuideInfo} from '../components';

class MyGuideDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
          dataStatus : false
        }
    }


    componentDidMount(){
      var pid = this.props.match.params.pid

      this.props.getProgramDetail(pid).then(()=>{


        console.log(this.props.programDetail);


        this.setState({dataStatus : true})
        console.log(this.state)
      })
    }

    render() {
        return(
            <div>
              <div className='row'>
                <div className = 'col s10'>
                  {this.state.dataStatus ? <MyProgramDetailContents detailInfo={this.props.programDetail}/> : <div> Loading.. </div>}
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        programDetail : state.Program.programDetail.data
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    getProgramDetail: (pid) => {
      return dispatch(getProgramDetail(pid));
    }

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyGuideDetail);

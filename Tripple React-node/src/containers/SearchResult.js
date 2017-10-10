import React, { Component, PropTypes } from 'react';
import { GuideCardItem } from '../components'
import { connect } from 'react-redux';
import {
    searchProgramListRequest
} from '../actions/program';
import {
  dibRequest
} from '../actions/reserve'


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.toProgramDetail=this.toProgramDetail.bind(this);
        this.onDibs=this.onDibs.bind(this);
    }



    componentWillMount(){
      let city = this.props.match.params.city;
      let searchDate = this.props.match.params.searchDate;

      this.props.searchProgramListRequest(city, searchDate).then(
        ()=>{
        console.log(this.props.searchProgramData);
      }
      )
    }

    toProgramDetail(openProgramId){
      console.log(openProgramId);
      this.props.history.push('/ProgramDetail/'+openProgramId);
    }

    onDibs(opid,cid){
      console.log(opid+cid);
      this.props.dibRequest(opid,cid).then(()=>{
        console.log("main먼저?");
        if(this.props.dibStatus==='SUCCESS'){
          alert('찜!')
        }else{
          alert('이미 찜(예약)이 되어있는 프로그램 입니다.')
        }

      })
    }

    render() {
        const searchResultList = (data)=>{
          return data.map((program,i)=>{
            return <GuideCardItem data={program}
            toProgramDetail={this.toProgramDetail}
            onDibs = {this.onDibs}
            currentUser={this.props.currentUser}
            key={i}/>
          })
        }

        return(
          <div className="container">

            <div className="row">
              <h3>{this.props.match.params.city == 'undefined' ? '':this.props.match.params.city}
                  {this.props.match.params.searchDate == 'undefined' ? '':' '+this.props.match.params.searchDate} 검색 결과</h3>
              {searchResultList(this.props.searchProgramData)}
            </div>

          </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        searchProgramData: state.Program.searchList.data,
        currentUser:state.Login.status.currentUser,
        dibStatus:state.Reserve.dib.status
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    searchProgramListRequest: (city, meetingDate) => {
      return dispatch(searchProgramListRequest(city, meetingDate));
    },
    dibRequest:(opid,cid)=>{
      return dispatch(dibRequest(opid,cid));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

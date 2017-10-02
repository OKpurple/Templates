import React, { Component, PropTypes } from 'react';
import { GuideCardItem } from '../components'
import { connect } from 'react-redux';
import {
    searchProgramListRequest
} from '../actions/program';


class SearchResult extends Component {
    constructor(props) {
        super(props);
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
    render() {
        const searchResultList = (data)=>{
          return data.map((program,i)=>{
            return <GuideCardItem data={program} key={i}/>
          })
        }

        return(
          <div className="container">

            <div className="row">
              <h3>도시, 일정 검색 결과</h3>
              {searchResultList(this.props.searchProgramData)}
            </div>

          </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        searchProgramData: state.Program.searchList.data
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    searchProgramListRequest: (city, meetingDate) => {
      return dispatch(searchProgramListRequest(city, meetingDate));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

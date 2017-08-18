import React, { Component, PropTypes } from 'react';
import { GuideCardItem } from '../components'
import { connect } from 'react-redux';
import {
    openProgramRequest
} from '../actions/openProgram';


class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
      console.log(this.props.match.params);
    }
    render() {
        return(
        <div>
          <GuideCardItem/>

        </div>
        );
    }
}


//
// const mapStateToProps = (state) => {
//     return {
//         status: state.Login.status,
//         opData: state.OpenProgram.list.data
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return{
//     openProgramRequest:(city,meetingDate)=>{
//       return dispatch(openProgramRequest(city, meetingDate));
//     }
//
//   };
// }

//export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
export default SearchResult

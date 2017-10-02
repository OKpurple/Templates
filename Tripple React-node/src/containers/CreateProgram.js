import React, { Component, PropTypes } from 'react';
import { GoogleMap,RoutesPlan } from '../components';
import { connect } from 'react-redux';
import {
    createRoutes
} from '../actions/program';


class CreateProgram extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    componentWillMount(){
      console.log(JSON.stringify(this.props.routesData));
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
         this.props.history.push('/CreateMeetPlace');
       }
    }


    render() {
        return(
          <div>
            <h3 className='center'>1. 장소 등록</h3>
            <div>
              <GoogleMap onNext={this.handleNext}/>

            </div>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        routesData: state.Program.createProgramInfo.routesData
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    createRoutes: (routes) => {
      return dispatch(createRoutes(routes));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgram);

import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { InputProgram } from '../components';
import { connect } from 'react-redux';
import {
    createRoutes
} from '../actions/program';

class CreatePDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }


    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(nextState);
        this.setState(nextState);
    }

    handleNext(){
      var routes =[];
      this.props.routesData.map((route,key)=>{
        var text = this.state[(key+1)]
        routes.push(Object.assign({},route,{explanation:text}));
      })
      this.props.createRoutes(routes);
      this.props.history.push('/Program');
    }

    render() {
        const routesDetail = (data)=>{
          return data.map((route)=>{

            return(
              <div className='row #00897b teal darken-1 white-text float-text' key={route.order}>
                <div className='col s4'>
                  <div>
                  <h2 className='center'>{route.placeName}</h2>
                  <p className='right'>{route.order} spot - {route.routeTime}분</p>
                  </div>
                </div>
                <div className=" col s6 offset-s1 #00897b teal darken-3 marginHorizontal">
                  <textarea id="textarea1" name={route.order} className="materialize-textarea" onChange={this.handleChange} defaultValue={route.explanation}></textarea>
                </div>
              </div>
            )
          })
        }

        return(
            <div className='row'>
              <h3 className='center'>4. 상세 설명</h3>
              <div className='col s9 offset-s1'>
                    {routesDetail(this.props.routesData)}
              </div>
              <div className='row'>
                <div className= 'col s8 offset-s2'>
                  <button className="btn right marginT waves-effect waves-light red lighten-3" onClick={this.handleNext}>다음</button>
                  <NavLink to='/CreateDetail'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></NavLink>
                </div>
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
    createRoutes: (data) => {
      return dispatch(createRoutes(data));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePDetail);

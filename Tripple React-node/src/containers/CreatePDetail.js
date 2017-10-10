import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { InputProgram } from '../components';
import { connect } from 'react-redux';
import {
    createRoutes,
    createProgramInfo
} from '../actions/program';

class CreatePDetail extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.routesData)
        console.log(this.props.content)
        this.state = {
          content:this.props.content
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }
    componentWillMount(){
      this.props.routesData.map((route)=>{
        let order={};
        order[route.order]=route.explanation;
        console.log(order);
        this.setState(order)
      })
    }

    // handleImgFile(e){
    //   var img = document.getElementById(e.target.name);
    //   img.src = URL.createObjectURL(e.target.files[0]);
    //
    //   var formData = new FormData();
    //   var myData = e.target.files[0];
    //   formData.append(e.target.name,myData);
    //
    //   this.setState({e.target.name:formData})
    // }

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

      console.log(routes)
      console.log(this.state.content)

      if(this.state.content==='' || this.state.content==='undefined'){
        alert('프로그램 소개를 입력하세요.')
      }else{
        this.props.updateProgramInfo({content:this.state.content})
        this.props.createRoutes(routes);
        this.props.history.push('/CreateMeetPlace');
      }
    }

    render() {
      // <input className='col s12' encType="multipart/form-data" type='file' id='program_img' name={img_id} onChange={this.handleImgFile}/>
      // <img className='cos s12' src='http://127.0.0.1:4000/images/asset/default.png' id={img_id} width='100%' height='200px' />
        const routesDetail = (data)=>{
          return data.map((route)=>{
            var img_id = 'program_img'+route.order;
            return(

                <div className='row #00897b teal darken-1 white-text float-text' key={route.order}>
                  <div className='row'>
                    <div className='col s4'>
                      <div>
                      <h2 className='center'>{route.placeName}</h2>
                      <p className='right'>{route.order} spot - {route.routeTime}분</p>
                      </div>
                    </div>
                    <div className=" col s6 offset-s1 #00897b teal darken-3 marginHorizontal">
                      <textarea id="textarea1"
                                name={route.order}
                                className="materialize-textarea"
                                onChange={this.handleChange}
                                defaultValue={route.explanation}>
                      </textarea>
                    </div>
                  </div>
                </div>

            )
          })
        }

        return(
            <div className='row'>
              <h3 className='center'>2. 활동 상세 설명</h3>

                <div className='col s5 offset-s1'>
                  <h4>장소 소개</h4>
                    {routesDetail(this.props.routesData)}
                </div>
                <div className='col s4 offset-s1'>
                  <h4>프로그램 소개 / 인사</h4>
                  <div>
                    <textarea className='intro z-depth-2'
                              name='content'
                              onChange={this.handleChange}
                              defaultValue={this.props.content}>
                    </textarea>
                  </div>
                </div>





              <div className='row'>
                <div className= 'col s9 offset-s2'>
                  <button className="btn right marginT waves-effect waves-light red lighten-3" onClick={this.handleNext}>다음</button>
                  <NavLink to='/CreateProgram'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></NavLink>
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        routesData: state.Program.createProgramInfo.routesData,
        content :state.Program.createProgramInfo.programInfo.content
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    createRoutes: (data) => {
      return dispatch(createRoutes(data));
    },
    updateProgramInfo: (data)=>{
      return dispatch(createProgramInfo(data))
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePDetail);

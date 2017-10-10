import React, { Component, PropTypes } from 'react';
import { DetailGoogleMap, Personal_Review} from '../components';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';
import {connect} from 'react-redux';

class ProgramDetailContents extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
      var el_time=0;
      this.props.detailInfo.routesInfo.map((route)=>{
        el_time += route.elapsed_time;
      })
      console.log(el_time)
    }

    componentDidMount(){
      this.$slide = $(this.slide);
      this.$slide.ready(function(){
        $('.slider').slider();
      });
    }
    render() {

      const imgSlider = (routes) => {
          return routes.map((route,key)=>{
            const url =route.img_url
            return(
            <li key={route.route_id}>
              <img src={url} width='100%'/>
              <div className="caption center-align">
                <h3>{key}-{route.title}</h3>
                <pre>{route.explanation}</pre>
              </div>
            </li>
          )
        })
      }

      const category = ()=>{
        var arr = this.props.detailInfo.programInfo.themes.split(';');
        for(var i = 0 ; i<arr.length; i++){
          return(
            <div className='chip'>
              {arr[i]}
            </div>
          )
        }
      }

        return(



          <div className="col s8">
            <div className='center'>
              <h1>{this.props.detailInfo.programInfo.title}</h1>
              <h4>{category()}</h4>
            </div>
            <div>
              <img src={this.props.detailInfo.programInfo.img_url} width='100%' height='300px'/>
            </div>

            <div>

              <h4>₩ {this.props.detailInfo.programInfo.price}</h4>
              <h4><i className="material-icons">place</i>  <span>{this.props.detailInfo.programInfo.address}</span> </h4>
              <h4><i className="material-icons">insert_invitation</i><span>{this.props.detailInfo.programInfo.meeting_date}</span></h4>
              <h4><i className="material-icons">access_time</i> <span>{this.props.detailInfo.programInfo.start_time}</span></h4>
              <h4><i className="material-icons marginB">people_outline</i> 최대<span>{this.props.detailInfo.programInfo.participant_max}</span>명 </h4>

            </div>




            <div>
              <div className="divider"></div>
            </div>





            <div className='pd_paddingHorizontal'>
              <h4>프로그램 소개</h4>
              <h5>{this.props.detailInfo.programInfo.content}</h5>
            </div>





            <div>
              <div className="divider"></div>
            </div>





            <div className='pd_paddingHorizontal' ref = {el => this.slide = el}>
              <h4>일정 소개</h4>
              <div className="slider">
                <ul className="slides">
                  {imgSlider(this.props.detailInfo.routesInfo)}
                </ul>
              </div>
            </div>




            <div>
              <div className="divider"></div>
            </div>




            <div className='pd_paddingHorizontal'>
              <h4>Spot</h4>
              <DetailGoogleMap routesInfo={this.props.detailInfo.routesInfo} opid={this.props.opid} pid={this.props.detailInfo.pid}/>
            </div>

            <div>
             <div className="divider"></div>
           </div>


           <div className='pd_paddingHorizontal'>
            <h4>후기</h4>
             <Personal_Review/>
           </div>


          </div>

        );
    }
}

export default ProgramDetailContents;

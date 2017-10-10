import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';

const propTypes = {
};
const defaultProps = {
};
class MyProgramDetailContents extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
      //로그
      console.log(this.props.detailInfo)



      //줄바꿈
      var content_value = this.props.detailInfo.content;
      content_value=content_value.replace(/\n/gi,'<br/>')

      var content = document.getElementById('program_content');
      content.innerHTML=content_value;

      //슬라이더
      this.$slide = $(this.slide);
      this.$slide.ready(function(){
        $('.slider').slider();
      });



      //지도 루트 표시
      let routes = this.props.detailInfo.routesInfo;

      const script = document.createElement('script');
      const script1 = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5PIOp7E83jz9-EtbthhehmGKL9AAWeNU&libraries=places&callback=initMap";

      let makeMarker=`
      function initMap(){
        //Map load
      var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: ${routes[0].lat}, lng: ${routes[0].lng}},
          zoom: 13
        });

      var infowindow;
      var contentString;
      `
      //marker 추가
      routes.map((route,key)=>{
        makeMarker += `
          var marker${key} = new google.maps.Marker({
            position:{lat:${route.lat}, lng:${route.lng}},
            map:map
          })

          contentString=\`
          <div>
            <p>장소${key+1}</p>
            </br>
            <p class='center'><strong>[${route.title}]</strong></p>
          </div>
          \`

          marker${key}.addListener('click',function(){
            infowindow = new google.maps.InfoWindow({
                content: contentString
              });
            infowindow.open(map, marker${key});
          })

        `

      })
      makeMarker += `};`
      script1.text=makeMarker;
      this.instance.appendChild(script1);
      this.instance.appendChild(script);


    }


    render() {

        const imgSlider = (routes) => {
            return routes.map((route)=>{
              const url =route.img_url
              return(
              <li key={route.route_id}>
                <img src={url} width='100%'/>
                <div className="caption center-align">
                  <h3>{route.title}</h3>
                </div>
              </li>
            )
          })
        }

        const routesDiv = (routes)=>{
          return routes.map((route)=>{
            let expl = route.explanation;
            //expl=expl.replace(/\n/gi,'<br/>');

            return(
              <div key={route.route_id}>
                <p><strong>[{route.title}]</strong> - {route.elapsed_time}분</p>
                <pre>{expl}</pre>
                <br/>
              </div>
            )
          })
        }

        const myCategory = ()=>{
          var arr = this.props.detailInfo.themes.split(';');
          console.log(arr);
            for(var i = 0; i<arr.length; i++){
              return(
                <div className="chip">
                  {arr[i]}
                </div>
              )
            }
          }

          const el_time = ()=>{
            //소요시간
            var el_time=0;
            this.props.detailInfo.routesInfo.map((route)=>{
              el_time += route.elapsed_time;
            })
            return(el_time);
          }

        return(

          <div className='row'>
            <div className='row'>

            <div className='col s7'>
              <img src={this.props.detailInfo.img_url} width='100%' height='300px'/>
            </div>

              <div className='center col s5'>
                <h1>{this.props.detailInfo.title}</h1>
              </div>

              <div className='col s5'>
                <h5>
                  <span> ₩ {this.props.detailInfo.price}</span>원
                </h5>
                <h5>
                  <i className="material-icons">people_outline</i>
                   최대 <span>{this.props.detailInfo.participant_max}</span>명
                </h5>
                <h5>
                  <i className="material-icons">place</i>{this.props.detailInfo.address}
                </h5>
                <h5>
                  <i className="material-icons">access_time</i> {this.props.detailInfo.start_time} (~ {el_time()}분)
                </h5>
                <h5>
                  {myCategory()}
                </h5>
              </div>
            </div>

            <div>
              <div className="divider"></div>
            </div>





            <div>
              <h4>프로그램 소개</h4>
              <div className='pd_paddingHorizontal'>
                <h5 id = 'program_content'></h5>
              </div>
            </div>





            <div>
              <div className="divider"></div>
            </div>


            <div ref = {el => this.slide = el}>
              <h4>일정 소개</h4>

              <div className='pd_paddingHorizontal'>
                <div className='col s6'>
                  {routesDiv(this.props.detailInfo.routesInfo)}
                </div>
                <div ref={el => (this.instance = el)} className='col s6'>
                    <div id='map' ></div>
                </div>
              </div>
            </div>


          </div>
        );
    }
}

export default MyProgramDetailContents;

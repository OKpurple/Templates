import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import {getRoutesInfo} from '../actions/openProgram'
class DetailGoogleMap extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    handleNext(){
      var rows = document.getElementById('routesTable').rows;
      this.props.onNext(rows);
    }

    componentWillMount(){

      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5PIOp7E83jz9-EtbthhehmGKL9AAWeNU&libraries=places&callback=initMap";


      this.props.getRoutesInfo(this.props.opid).then(()=>{
        console.log(this.props.routes);
        let routes = this.props.routes;
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
        const script1 = document.createElement('script');
        script1.text=makeMarker;

        this.instance.appendChild(script1);
        this.instance.appendChild(script);
        

      })
    }





    render() {
        return(
          <div className = 'row marginT'>
            <div ref={el => (this.instance = el)} className='col s12'>


                <div id='map' ></div>

            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.OpenProgram.detailInfo.status,
        routes: state.OpenProgram.routes.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getRoutesInfo:(opid)=>{
        return dispatch(getRoutesInfo(opid));
      }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailGoogleMap);

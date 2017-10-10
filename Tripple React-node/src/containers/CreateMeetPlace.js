import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createMeetingInfo} from '../actions/program'


class CreateMeetPlace extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    handleNext(){
      var place = document.getElementById('meetingAddress').innerText;
      var time = document.getElementById('meetingTime').value;
      var coordi = document.getElementById('meetingAddress').coordi;


      if(place === "" || time ===""){
        alert('모임 장소와 시간을 모두 입력하세요.');
      }else{

        var meetingInfo = new Object();
        meetingInfo.time = document.getElementById('meetingTime').value;
        meetingInfo.address = document.getElementById('meetingAddress').innerText;
        meetingInfo.lng = coordi.lng();
        meetingInfo.lat = coordi.lat();

      this.props.createMeetingInfo(meetingInfo);
      this.props.history.push('/CreateDetail');
      }

    }

    componentWillMount(){

      console.log("CreateMeetPlace compoWillMount");
      console.log(this.props.routesData)
    }

    componentDidMount(){
      this.$el = $(this.el);
      this.$el.pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
      });



       const script1 = document.createElement('script');

      script1.text =`
      var map;

      var currMarker;
      var currLocation;
      var infowindow;

      var oldMarkers =[];



      function initMap(){
        //Map load
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.551, lng: 126.987},
          zoom: 13,
          mapTypeId: 'roadmap'
        });



        //autocomplete load
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener('bounds_changed', function() {
          console.log('bounds_changed');
         searchBox.setBounds(map.getBounds());
       });




       var geocoder = new google.maps.Geocoder;

       map.addListener('rightclick',function(e){
         //마커 정리
         oldMarkers.forEach(function(marker){
           marker.setMap(null);
         })
         oldMarkers=[];

         currLocation = e.latLng;


        //주소
        geocoder.geocode({'latLng': currLocation}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  var address_nm = results[0].formatted_address;
                  var addr = document.getElementById('meetingAddress');
                  addr.innerHTML = address_nm
                  addr.coordi = currLocation
                }
              } else {

              }
       });

         currMarker = new google.maps.Marker({
           position: e.latLng,
           map : map,
           title : "hello"
         });

         oldMarkers.push(currMarker);

         map.panTo(e.latLng);


       })



       //자동완성
        searchBox.addListener('places_changed', function() {
          console.log('places_changed');
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }



          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };


            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

      };
      `

      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5PIOp7E83jz9-EtbthhehmGKL9AAWeNU&libraries=places&callback=initMap";


      this.instance.appendChild(script);
      this.instance.appendChild(script1);


    }



    render() {
        return(
          <div>
            <h3 className='center'>2. 모임 위치</h3>
            <div className = 'row marginT'>
              <div ref={el => (this.instance = el)} className='col s5 offset-s1'>

                  <input id='pac-input'
                   type='text'
                   placeholder='Search Box'/>
                  <div id='map' ></div>

              </div>
              <div className='col s5 offset-s1'>
                <h5 className='marginHorizontal'> 모이는 곳 </h5>
                  <p id="meetingAddress">주소</p>
                <h5 className='marginHorizontal'> 모이는 시간 </h5>
                  <input id ='meetingTime' className='col s5' placeholder="00:00" type="text" ref={el => this.el = el}/>
              </div>




                <div className='col s9 offset-s2'>
                  <button className="btn right marginT waves-effect waves-light red lighten-3" onClick={this.handleNext}>다음</button>
                  <Link to='/CreatePDetail'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></Link>
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
    createMeetingInfo: (info) => {
      return dispatch(createMeetingInfo(info));
    }

  };
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateMeetPlace);

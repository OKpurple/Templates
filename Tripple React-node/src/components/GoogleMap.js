import React, { Component, PropTypes } from 'react';

import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    handleNext(){
      var rows = document.getElementById('routesTable').rows;
      this.props.onNext(rows);
    }

    componentDidMount(){
       const script1 = document.createElement('script');

      script1.text =`
      var map;
      var cnt = 1;
      var currMarker;
      var currLocation;
      var infowindow;
      var markers = [];
      var oldMarkers =[];
      var info;

      function deleteSpot(){
        console.log(currMarker.pk);

      }

      var cancelInfoContents = \`
       <a class="waves-effect waves-light btn" onClick='deleteSpot()'>삭제</a>
      \`

      function addSpot(){

        var spot = document.getElementById('routeContent').value;
        var time = document.getElementById('routeTime').value;

        if(spot === '' || time === ''){
          alert('내용을 입력하세요');
        }else if(isNaN(time) || time<=0 || time > 180){
          alert('소요 시간을 정확히 입력하세요 (숫자만, 180분 이하)')
        }else{
          oldMarkers.pop();
          currMarker.pk = cnt++;
          currMarker.spot = spot;
          currMarker.time = time;
          currMarker.addListener('click',function(){
            info = new google.maps.InfoWindow({
              content: cancelInfoContents
            });
            currMarker = this;

            info.open(map,this);
          })
          markers.push(currMarker);

          infowindow.close()

          var table = document.getElementById('routesTable');
          var row = table.insertRow( table.rows.length );
          row.insertCell(0).innerHTML = currMarker.pk;
          row.insertCell(1).innerHTML = currMarker.spot;
          row.insertCell(2).innerHTML = currMarker.time;
          row.coordi = currLocation;
          console.log("my key" +row.coordi.lng())
        }
      }

      function cancel(){
        currMarker.setMap(null);
        infowindow.close()
      }

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



       var addInfoContents = \`
        <div>
            <span>Spot 내용</span><input id='routeContent' placeholder = '우리동네 숨은 명소' type="text"/>
            <span>소요시간</span><input id='routeTime' type="text" placeholder ='분 단위 ex) 100분'/>
            <a class="waves-effect waves-light btn right" onClick='addSpot()'>추가</a>
            <a class="waves-effect waves-light btn" onClick='cancel()'>취소</a>
        </div>
       \`



       map.addListener('rightclick',function(e){
         //마커 정리
         oldMarkers.forEach(function(marker){
           marker.setMap(null);
         })
         oldMarkers=[];



         currLocation = e.latLng;
         currMarker = new google.maps.Marker({
           position: e.latLng,
           map : map,
           title : "hello"
         });

         oldMarkers.push(currMarker);

         map.panTo(e.latLng);

         infowindow = new google.maps.InfoWindow({
           content: addInfoContents
         });

         infowindow.open(map,currMarker);

       })




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
          <div className = 'row marginT'>
            <div ref={el => (this.instance = el)} className='col s5 offset-s1'>

                <input id='pac-input'
                 type='text'
                 placeholder='Search Box'/>
                <div id='map' ></div>

            </div>

            <div className='col s4 '>
              <table id ='routesTable'>
                <thead>
                  <tr>
                    <th>순서</th>
                    <th>장소</th>
                    <th>시간</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>

              </div>
              <div className = 'col s8 offset-s2 '>
                <button className="btn right marginT waves-effect waves-light red lighten-3" onClick={this.handleNext}>다음</button>
              </div>
            </div>
        );
    }
}
GoogleMap.propTypes = propTypes;
GoogleMap.defaultProps = defaultProps;
export default GoogleMap;

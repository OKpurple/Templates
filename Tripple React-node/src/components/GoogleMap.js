import React, { Component, PropTypes } from 'react';
import RoutesPlan from '../components';
const propTypes = {
};
const defaultProps = {
};
class GoogleMap extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
      const allScripts = document.getElementsByTagName( 'script' );
[].filter.call(
  allScripts,
  ( scpt ) => scpt.src.indexOf( 'key=googleAPIKEY' ) >= 0
 )[ 0 ].remove();

 window.google = {};
    }

    componentDidMount(){
       const script1 = document.createElement('script');

      script1.text =`
          function initMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.551, lng: 126.987},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener('bounds_changed', function() {
          console.log('bounds_changed');
         searchBox.setBounds(map.getBounds());
       });


       var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          console.log('places_changed');
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

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

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

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



      this.instance.appendChild(script1);
      this.instance.appendChild(script);

    }



    render() {
        return(
          <div ref={el => (this.instance = el)} className='col s6'>

              <input id='pac-input'
               type='text'
               placeholder='Search Box'/>
              <div id='map' ></div>

          </div>
        );
    }
}
GoogleMap.propTypes = propTypes;
GoogleMap.defaultProps = defaultProps;
export default GoogleMap;

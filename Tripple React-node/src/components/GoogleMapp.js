import React, { Component, PropTypes } from 'react';
import RoutesPlan from '../components';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const propTypes = {
};
const defaultProps = {
};

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

class GoogleMapp extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return(
          <div className='col s6'>

            <GettingStartedGoogleMap
    containerElement={
      <div style={{ height: `100%` }} />
    }
    mapElement={
      <div style={{ height: `100%` }} />
    }
    onMapLoad={_.noop}
    onMapClick={_.noop}
    markers={markers}
    onMarkerRightClick={_.noop}
  />

          </div>
        );
    }
}
GoogleMapp.propTypes = propTypes;
GoogleMapp.defaultProps = defaultProps;
export default GoogleMapp;

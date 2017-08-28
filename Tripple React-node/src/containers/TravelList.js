import React, { Component, PropTypes } from 'react';
import {GoogleMap} from '../components/'
const propTypes = {
};
const defaultProps = {
};
class TravelList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='row'>
            <div>TravelList</div>
            <div>TravelList</div>
            <GoogleMap className='col s1'/>
          </div>
        );
    }
}
TravelList.propTypes = propTypes;
TravelList.defaultProps = defaultProps;
export default TravelList;

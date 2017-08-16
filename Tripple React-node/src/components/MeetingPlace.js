import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class MeetingPlace extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className='col s6'>
              <h5 className='marginHorizontal'> 모이는 곳 </h5>

              <p>서울특별시 어디어디</p>
              <h5 className='marginHorizontal'> 모이는 시간 </h5>
              <input className='col s5' name="searchDate"
               type="time"
               />
            </div>
        );
    }
}
MeetingPlace.propTypes = propTypes;
MeetingPlace.defaultProps = defaultProps;
export default MeetingPlace;

import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
class RoutePlan extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='col s6'>
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>장소</th>
                  <th>시간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>서울특별시 마포구</td>
                  <td>100분</td>
                </tr>
              </tbody>
            </table>
              
            </div>
        );
    }
}
RoutePlan.propTypes = propTypes;
RoutePlan.defaultProps = defaultProps;
export default RoutePlan;

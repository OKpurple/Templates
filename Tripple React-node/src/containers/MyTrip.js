import React, { Component, PropTypes } from 'react';
import {SideNav} from '../components/';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import {MyGuide, MyReservedTravel} from '../components/';

const propTypes = {
};
const defaultProps = {
};



class MyTrip extends Component {
    constructor(props) {
        super(props);

    }




    render() {



        return(
          <div className='row'>
            <SideNav />
            <div className="col s8 ">
              <h3> 나의 여행 페이지</h3>


                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="내가 만든 여행">
                    <MyGuide />
                  </Tab>
                  <Tab eventKey={2} title="내가 예약한 여행">
                    <MyReservedTravel />
                  </Tab>

                </Tabs>



            </div>
          </div>
        );
    }
}
MyTrip.propTypes = propTypes;
MyTrip.defaultProps = defaultProps;
export default MyTrip;

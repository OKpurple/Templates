import React, { Component, PropTypes } from 'react';
import {SideNav} from '../components/';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { DropdownButton, SplitButton, Dropdown, Button,ButtonToolbar, MenuItem, ButtonGroup } from 'react-bootstrap';


const propTypes = {
};
const defaultProps = {

};

const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
function renderDropdownButton(title, i) {
  return (
    <DropdownButton bsStyle={title.toLowerCase()} title={title} key={i} id={`dropdown-basic-${i}`}>
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3" active>Active Item</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  );
};
const buttonsInstance = (
  <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
);


const buttonGroupInstance = (
  
  <ButtonGroup>

    <DropdownButton title="Dropdown" id="bg-nested-dropdown">
      <MenuItem eventKey="1">Dropdown link</MenuItem>
      <MenuItem eventKey="2">Dropdown link</MenuItem>
    </DropdownButton>
  </ButtonGroup>


);

class Review extends Component {
    constructor(props) {
        super(props);

    }

    render() {



        return(
          <div className='row'>
            <SideNav />
            <div className="col s8">
              <h3> 후기페이지</h3>


                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="내가 작성한 후기">
                      <h3> 후기</h3>
                    </Tab>
                    <Tab eventKey={2} title="나에 대한 후기">
{buttonsInstance}{buttonGroupInstance}

                    </Tab>
                    <Tab eventKey={3} title="미작성 여행">
                      <h3> 후기</h3>
                    </Tab>
                </Tabs>


            </div>
          </div>
        );
    }
}
Review.propTypes = propTypes;
Review.defaultProps = defaultProps;
export default Review;

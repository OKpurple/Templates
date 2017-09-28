import React, { Component, PropTypes } from 'react';
import {ProgramDetailGuideInfo,ProgramDetailContents} from '../components'
const propTypes = {
};
const defaultProps = {
};
class Test extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='row'>


            <ProgramDetailContents/>
            <ProgramDetailGuideInfo/>
          </div>
        );
    }
}
Test.propTypes = propTypes;
Test.defaultProps = defaultProps;
export default Test;

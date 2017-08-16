import React, { Component, PropTypes } from 'react';
import { InputGuide } from '../components';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class CreateDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className='row'>
              <h3 className='center'>3. 가이드 정보</h3>
              <InputGuide/>
              <div className= 'col s8 offset-s2'>
                <NavLink to='/CreatePDetail'><button className="btn right marginT waves-effect waves-light red lighten-3">다음</button></NavLink>
                <NavLink to='/CreateMeetPlace'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></NavLink>
              </div>

            </div>
        );
    }
}
CreateDetail.propTypes = propTypes;
CreateDetail.defaultProps = defaultProps;
export default CreateDetail;

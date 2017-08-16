import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { InputProgram } from '../components';
const propTypes = {
};
const defaultProps = {
};
class CreatePDetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className='row'>
              <h3 className='center'>4. 프로그램 정보</h3>
              <InputProgram/>
              <div className= 'col s8 offset-s2'>
                <NavLink to='/Program'><button className="btn right marginT waves-effect waves-light red lighten-3">다음</button></NavLink>
                <NavLink to='/CreateDetail'><button className="btn right marginT waves-effect waves-light red lighten-3">이전</button></NavLink>
              </div>
            </div>
        );
    }
}
CreatePDetail.propTypes = propTypes;
CreatePDetail.defaultProps = defaultProps;
export default CreatePDetail;

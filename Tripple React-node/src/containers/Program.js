import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class Program extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='row'>
            <h3 className='center'>최종 확인</h3>

            <div className= 'center'>
              <NavLink to='/CreatePDetail'><button className="btn marginR waves-effect waves-light red lighten-3">이전</button></NavLink>
              <NavLink to='/'><button className="btn marginL waves-effect waves-light red lighten-3">등록</button></NavLink>
            </div>

          </div>
        );
    }
}
Program.propTypes = propTypes;
Program.defaultProps = defaultProps;
export default Program;

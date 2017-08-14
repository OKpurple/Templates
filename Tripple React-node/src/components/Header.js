import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import NavContent  from './NavContent';
const propTypes = {
  isLoggedIn: React.PropTypes.bool,
   onLogout: React.PropTypes.func
};
const defaultProps = {
  isLoggedIn: false,
   onLogout: () => { console.error("logout function not defined");}
};
class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {

            const loginButton = (
                  <li>
                      <a>
                          <NavLink to = "/login"><i className="material-icons">vpn_key</i></NavLink>
                      </a>
                  </li>
              );

              const logoutButton = (

                  <li>
                      <a>
                          <i className="material-icons">lock_open</i>
                      </a>
                  </li>


              );



            let islogined = true;
        return(
          <nav className="nav-extended">

              <div className="nav-wrapper">
                  <NavLink to="/" className="brand-logo marginL" activeClassName="active">Tripple</NavLink>

                  <div className="right">
                      <ul>
                          { this.props.isLoggedIn ? logoutButton : loginButton }
                      </ul>
                  </div>
              </div>
              {islogined ? <NavContent/> : undefined}

          </nav>
        );
    }
}
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;


//

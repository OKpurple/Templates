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
        // { this.props.isloggedIn ? <NavContent/> : undefined }
    }


    render() {


            const registerButton = (
                  <li>
                      <a>
                          <NavLink to = "/Register"><i className="material-icons">person_outline</i></NavLink>
                      </a>
                  </li>
              );

              const myPageButton = (
                    <li>
                        <a>
                            <NavLink to = "/MyPage"><i className="material-icons">person_pin</i></NavLink>
                        </a>
                    </li>
                );



            const loginButton = (
                  <li>
                      <a>
                          <NavLink to = "/login"><i className="material-icons">vpn_key</i></NavLink>
                      </a>
                  </li>
              );

              const logoutButton = (

                  <li>
                       <a onClick={this.props.onLogout}>
                          <i className="material-icons">lock_open</i>
                      </a>
                  </li>


              );


            let islogined = true;
        return(

          <nav className="nav-extended blue-grey darken-3">


              <div className="nav-wrapper">
                  <NavLink to="/" className="brand-logo marginL" activeClassName="active">Tripple</NavLink>



                    <div className="right">

                        <ul>

                            { this.props.isLoggedIn ? myPageButton : registerButton }
                        </ul>
                    </div>

                  <div className="right">

                      <ul>
                          { this.props.isLoggedIn ? logoutButton : loginButton }
                      </ul>
                  </div>
              </div>
              { this.props.isLoggedIn ?  <NavContent/> : undefined }



          </nav>

        );
    }
}
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;


//

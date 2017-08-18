import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
const propTypes = {
   onLogin: React.PropTypes.func,
};
const defaultProps = {
   onLogin: (id, pw) => { console.error("login function not defined"); },
   onRegister: (id, pw) => { console.error("register function not defined"); }
};


class LoginForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          login_id: "",
          password: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
  }


  handleLogin() {
       let id = this.state.login_id;
       let pw = this.state.password;

       this.props.onLogin(id, pw).then(
           (success) => {
             console.log('loginform success');
               if(!success){
                   this.setState({
                       password: ''
                   });
               }
           }
       );
   }



  handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      console.log(nextState);
      this.setState(nextState);
  }
    render() {

      const loginView = (<div className="card-content">
         <div className="row">
             <div className="input-field col s12 username">
                 <label>Username</label>
                 <input
                 name="login_id"
                 type="text"
                 className="validate"
                 onChange={this.handleChange}
                value={this.state.username}/>
             </div>
             <div className="input-field col s12">
                 <label>Password</label>
                 <input
                 name="password"
                 type="password"
                 className="validate"
                 onChange={this.handleChange}
                 value={this.state.password}/>
             </div>
             <button className="col s12 btn waves-effect waves-light red lighten-3"
             onClick={this.handleLogin}>로그인 </button>
         </div>
     </div>)

        return(
          <div className="container auth">
             <NavLink className="logo" to="/">Tripple</NavLink>
             <div className="card">
                 <div className="header pink white-text center">
                     <div className="card-content">로그인</div>
                 </div>
                 {loginView}
             </div>
         </div>

        );
    }
}
LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
export default LoginForm;

import React from 'react';
import { LoginForm } from '../components';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/login';
import { updateProfileSuccess } from '../actions/user';

class Login extends React.Component {
  constructor(props) {
          super(props);
          this.handleLogin = this.handleLogin.bind(this);
      }

  handleLogin(id, pw) {
          return this.props.loginRequest(id, pw).then(() => {
                  if(this.props.status === "SUCCESS") {
                      // create session data
                      let loginData = {
                          isLoggedIn: true,
                          login_id: id
                      };
                      console.log('logincontainer success')
                      //쿠키로 키 등록
                      document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                      Materialize.toast('Welcome, ' + id + '!', 2000);




                      this.props.history.push('/');
                      return true;
                    }

                  else {
                    console.log('logincontainer fail')
                      let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                      Materialize.toast($toastContent, 2000);
                      return false;
                  }

              }
          );
      }



    render() {
        return (
          <LoginForm onLogin={this.handleLogin}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.Login.login.status //status.리듀서네임.속성속성
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

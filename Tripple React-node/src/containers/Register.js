import React from 'react';
import { RegisterForm } from '../components';
import { connect } from 'react-redux';
import {registRequest} from '../actions/login'

class Register extends React.Component {

    constructor(props){
      super(props);
      this.handleRegist = this.handleRegist.bind(this)
    }
    handleRegist(data){
      this.props.registRequest(data).then(()=>{
        if(this.props.status==='SUCCESS'){
          alert("회원가입 성공")
          this.props.history.push('/');
        }else{
          alert("회원가입에 실패");
        }
      });

    }
    render() {
        return (

              <RegisterForm onRegist={this.handleRegist}/>

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
        registRequest: (data) => {
            return dispatch(registRequest(data));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

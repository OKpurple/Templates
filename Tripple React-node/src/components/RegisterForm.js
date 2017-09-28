import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};
class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {

      const registerView = (<div className="card-content">
         <div className="row">
             <div className="input-field col s12 username">
                 <label>Email</label>
                 <input
                 name="login_id"
                 type="text"
                 className="validate"
                 />
             </div>

             <div className="input-field col s12">
                 <label>Password</label>
                 <input
                 name="password"
                 type="password"
                 className="validate"
                 />
             </div>


               <div className="input-field col s6">
                   <label>FirstName</label>
                   <input
                   name="firstName"
                   type="text"
                   className="validate"
                   />
               </div>

               <div className="input-field col s6">
                   <label>LastName</label>
                   <input
                   name="lastName"
                   type="text"
                   className="validate"
                   />
               </div>


             <button className="col s12 btn waves-effect waves-light blue-grey lighten-1">회원가입 </button>

         </div>
     </div>)

        return(

          <div className="container auth Form" >

             <div className="card">
                 <div className="header white-text center black">
                     <div className="card-content">회원가입</div>
                 </div>
                 {registerView}
             </div>
         </div>

        );
    }
}
RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;
export default RegisterForm;

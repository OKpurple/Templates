import React, { Component, PropTypes } from 'react';
import {InputGuide} from '../components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {updateProfile} from '../actions/user';
class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.onUpdateProfile=this.onUpdateProfile.bind(this);

    }



    onUpdateProfile(data){

      this.props.updateProfile(data,this.props.currentUser).then(()=>{
          if(this.props.status==='SUCCESS'){
            this.props.history.push('/MyPage');
          }else{
            alert("실패");
          }
      })

    }

    render() {
        return(
          <div>
            <div className='row'>
                <InputGuide onUpdateProfile={this.onUpdateProfile}/>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      currentUser: state.Login.status.currentUser,
      status: state.User.userProfile.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (data,id)=>{
            return dispatch(updateProfile(data,id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);

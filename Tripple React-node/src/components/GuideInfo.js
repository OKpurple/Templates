import React, { Component, PropTypes } from 'react';

class GuideInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className='col s12'>
              <div className="col s2 center">
                  <img src={this.props.profileInfo.profile_url} className="responsive-img circle" />
                  <div >
                    <p>{this.props.profileInfo.profile_text}</p>
                  </div>
              </div>
              <div className='col s6 offset-s1 z-depth-4'>
              <h3>{this.props.profileInfo.firstName} {this.props.profileInfo.lastName}</h3>
              <p>{this.props.profileInfo.email}</p>
              <p>0{this.props.profileInfo.phone}</p>
              <p>{this.props.profileInfo.sex}</p>
              <p>{this.props.profileInfo.birth}</p>
              <p>{this.props.profileInfo.nation}</p>
              <p>{this.props.profileInfo.languages}</p>
              </div>
          </div>
        );
    }
}

export default GuideInfo;

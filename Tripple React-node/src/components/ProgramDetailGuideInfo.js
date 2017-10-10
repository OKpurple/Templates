import React, { Component, PropTypes } from 'react';


const propTypes = {
};
const defaultProps = {
};
/*<span className="card-title black-text">내가 예약한 여행</span>*/


class ProgramDetailGuideInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return(

          <div className='col s3 offset-s1'>
              <div className="card teal blue-grey darken-3 " id="guide_box">
                <div className="card-content white-text center-align">
                    <div className='row'>
                      <img src={this.props.detailInfo.userInfo.profile_url} className='circle col s8 offset-s2'/>
                    </div>
                    <div className='row'>
                      <span className="card-title">{this.props.detailInfo.userInfo.firstName}{this.props.detailInfo.userInfo.lastName}</span>
                      <p>{this.props.detailInfo.userInfo.email}</p>
                      <p>{this.props.detailInfo.userInfo.birth}</p>
                      <p>{this.props.detailInfo.userInfo.sex}</p>
                    </div>
                              <br></br>

                              <a href="#" className="white-text">예약하기</a>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <a href="#" className="white-text">위시리스트</a>
                </div>
              </div>
          </div>

        );
    }
}
ProgramDetailGuideInfo.propTypes = propTypes;
ProgramDetailGuideInfo.defaultProps = defaultProps;
export default ProgramDetailGuideInfo;

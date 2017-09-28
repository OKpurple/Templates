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

          <div className="col s4 ">
              <div className="card red lighten-3">
                <div className="card-content white-text center-align">
                      <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R" />

                              <span className="card-title">홍길동</span>
                              <p>I am a very simple card. I am good at containing small bits of information.
                              I am convenient because I require little markup to use effectively.</p>
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

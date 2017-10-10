import React, { Component, PropTypes } from 'react';


const propTypes = {
};
const defaultProps = {
};

const personal_review=(
  <div>
      <br></br>
      <div className="chip">
        <img src="http://lorempixel.com/100/100/people/9/" alt="Contact Person"/>
        Jane Doe
      </div>
      <h5> 너무 재밌었어요. 가이드가 베테랑입니다. <br></br>
      밥도 맛있는 곳 추천해줘서 잘먹었어요.!!!</h5>

  </div>
);

class Personal_Review extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return(

          <div>
            {personal_review}
          </div>

        );
    }
}
Personal_Review.propTypes = propTypes;
Personal_Review.defaultProps = defaultProps;
export default Personal_Review;

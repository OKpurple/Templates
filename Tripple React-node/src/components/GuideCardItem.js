import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class GuideCardItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {

      const CardItem = (
        <div>
        <div className="col s3">
          <div className="card red lighten-3">
            <div className="card-image">
             <img src="http://13.124.115.238:8080/image/no_image.png"/>
            <span className="card-title black-text">서울에서 우리 같이 놀까요?</span>
            </div>
            <div className="card-content">
              <p>안녕하세요 함께 놀러갑시다.</p>
            </div>
            <div className="card-action">
              <a href="#" className="white-text">상세보기</a>
              <a href="#" className="white-text">찜하기</a>
            </div>
          </div>
         </div>
         </div>
      )

        return(

          <div className="row cardContainer">
            {CardItem}
            {CardItem}
            {CardItem}
            {CardItem}
            </div>








        );
    }
}
GuideCardItem.propTypes = propTypes;
GuideCardItem.defaultProps = defaultProps;
export default GuideCardItem;

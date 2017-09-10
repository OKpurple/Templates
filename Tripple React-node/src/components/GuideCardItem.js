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

        <div className="col s3">
          <div className="card">
            <div className="card-image">
             <img src="http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"/>

            </div>

            <div className="card-action">
              <p>₩96,069 Bike and taste the best of Paris at your own pace.</p>
              <br></br>
              <a href="#" className="blue-text left">상세보기</a>
              <a href="#" className="blue-text ">찜하기</a>
              <p className="right black-text"> 평점 <span> 3.5</span> 점</p>
            </div>
          </div>
         </div>

      )






        return(

          <div>

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

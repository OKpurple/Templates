import React, { Component, PropTypes } from 'react';
import { NavLink,reactDOMNode  } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
class GuideCardItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(

          <div className="col s3">
            <div className="card">
              <div className="card-image">
               <img src={this.props.data.img_url}/>

              </div>

              <div className="card-action">
                <span>₩ {this.props.data.price}</span>
                <span>{this.props.data.title}</span>
                <br></br>
                <NavLink to='/ProgramDetail' className="blue-text left"><p>상세보기</p></NavLink>
                <a className="blue-text">찜하기</a>
                <p className="right black-text"> 평점 <span> 3.5</span> 점</p>
              </div>
            </div>
           </div>

        );
    }
}
GuideCardItem.propTypes = propTypes;
GuideCardItem.defaultProps = defaultProps;
export default GuideCardItem;

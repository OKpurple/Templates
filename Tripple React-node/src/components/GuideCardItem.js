import React, { Component, PropTypes } from 'react';
import { NavLink,reactDOMNode  } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
class GuideCardItem extends Component {
    constructor(props) {
        super(props);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleDib = this.handleDib.bind(this);
    }

    handleDetail(){
      this.props.toProgramDetail(this.props.data.open_program_id);
    }
    handleDib(e){
      if(this.props.currentUser == ''){
        console.log("no user");
        alert('로그인 먼저 해주세요.')
      }else{
        this.props.onDibs(e.target.name,this.props.currentUser);
      }
    }



    render() {

      const dibBtn = (
        <a className="blue-text" onClick={this.handleDib} name={this.props.data.open_program_id}>찜하기</a>
      )
      const identify = (
        <p>내 글</p>
      )
        return(

          <div className="col s3">
            <div className="card">

              <div className="card-image">
               <img src={this.props.data.img_url} width='100%' height='200px'/>
              </div>

              <div className="card-content">
                <span> ₩{this.props.data.price}  </span>
                <span className='card-title activator grey-text text-darken-4'>{this.props.data.title}</span>
              </div>

              <div className="card-action">
                  <a className="blue-text" onClick = {this.handleDetail}>상세보기</a>
                  {this.props.currentUser == this.props.data.user_id ? identify : dibBtn}
                  <p className="black-text right"> 평점 <span> 3.5</span> 점</p>
              </div>

            </div>
           </div>

        );
    }
}
GuideCardItem.propTypes = propTypes;
GuideCardItem.defaultProps = defaultProps;
export default GuideCardItem;

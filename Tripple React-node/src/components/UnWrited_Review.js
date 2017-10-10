import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
const unwrited_review = (

  <div>
    <div className="col s6">

      <div className="card ">

        <div className="card-image">
         <img src="http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"/>

        </div>

        <div className="card-action">
          <p>₩96,069 Bike and taste the best of Paris at your own pace.</p>
          <br></br>
          <NavLink to = "/ProgramDetail" className="blue-text ">상세보기</NavLink>
          <p className="right purple-text ">참여완료</p>

        </div>
      </div>

    </div>

    <form className="col s6" id="review_form">

          <label for="review" className='purple-text'>후기</label>
          <textarea id="textarea1"></textarea>
          <label for="grade" className='purple-text'>점수</label>
          <input id="grade" type="text" className="validate"/>

            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>

    </form>

 </div>
)


class UnWrited_Review extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return(

          <div>
            {unwrited_review}
          </div>

        );
    }
}
UnWrited_Review.propTypes = propTypes;
UnWrited_Review.defaultProps = defaultProps;
export default UnWrited_Review;

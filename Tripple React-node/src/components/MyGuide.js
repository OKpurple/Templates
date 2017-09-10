import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const propTypes = {
};
const defaultProps = {
};


class MyGuide extends Component {
    constructor(props) {
        super(props);
    }
    render() {

      const myGuide = (

          <div className="row cardContainer ">
            <div className="col s4">

              <div className="card ">

                <div className="card-image">
                 <img src="http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"/>

                </div>

                <div className="card-action">
                  <p>₩96,069 Bike and taste the best of Paris at your own pace.</p>
                  <br></br>
                  <a href="#" className="blue-text">상세보기</a> <p className="right"> 평점 <span> 3.5</span> 점</p>
                </div>


                </div>

              </div>



             <div className="col s8 ">

               <table className="striped centered">

                 <thead>
                           <tr>
                               <th>일시</th>
                               <th>예약확정</th>
                               <th>예약대기</th>
                           </tr>
                         </thead>
                  <tbody>
                    <tr>
                      <td><p> <span>2017</span>년  <span>x</span>월 <span>x</span>일 </p>
                                    <p> <span>오전 xx:xx</span> ~ <span>오후 xx:xx</span> </p></td>
                      <td> <a href="#" className="green-text"><span>3</span>명</a></td>
                      <td><a href="#" className="orange-text"><span>3</span>명</a></td>
                    </tr>
                    <tr>
                      <td><p> <span>2017</span>년  <span>x</span>월 <span>x</span>일 </p>
                                    <p> <span>오전 xx:xx</span> ~ <span>오후 xx:xx</span> </p></td>
                                      <td> <a href="#" className="green-text"><span>3</span>명</a></td>
                                      <td><a href="#" className="orange-text"><span>3</span>명</a></td>
                    </tr>
                    <tr>
                      <td><p> <span>2017</span>년  <span>x</span>월 <span>x</span>일 </p>
                                    <p> <span>오전 xx:xx</span> ~ <span>오후 xx:xx</span> </p></td>
                                      <td> <a href="#" className="green-text"><span>3</span>명</a></td>
                                      <td><a href="#" className="orange-text"><span>3</span>명</a></td>
                    </tr>
                  </tbody>
                </table>


                <div className= 'col s1 offset-s6'>
                  <NavLink to='/'><button className="btn right marginT waves-effect waves-light ">일정추가</button></NavLink>

                </div>
             </div>
           </div>


      )

        return(
          <div>
            {myGuide}
            {myGuide}
            {myGuide}

            </div>
        );
    }
}
MyGuide.propTypes = propTypes;
MyGuide.defaultProps = defaultProps;
export default MyGuide;

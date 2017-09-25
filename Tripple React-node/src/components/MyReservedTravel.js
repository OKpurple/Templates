import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const propTypes = {
};
const defaultProps = {
};
/*<span className="card-title black-text">내가 예약한 여행</span>*/

class MyReservedTravel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const waitStatus = (<p className="right orange-text">확정대기</p>)
      const confirmStatus = (<p className="right green-text">참여확정</p>)

      const myReservedList = (data)=>{
        return data.map((program,i)=>{
          return(
            <div>
              <div className="col s4 ">

                <div className="card ">

                  <div className="card-image">
                   <img src={program.img_url}/>

                  </div>

                  <div className="card-action">
                    <p>{program.meeting_date} | {program.start_time} - {program.end_time}</p>
                    <p><strong>₩{program.price}</strong> {program.title}</p>
                    <br></br>
                    <a href="#" className="blue-text">상세보기</a>
                    {program.status > 0 ? confirmStatus : waitStatus}

                  </div>


                  </div>

                </div>
             </div>
          )
        })
      }


      // const myReservedTravel_yet = (
      //
      //     <div>
      //       <div className="col s4">
      //
      //         <div className="card ">
      //
      //           <div className="card-image">
      //            <img src="http://blog.arborday.org/wp-content/uploads/2013/02/NEC1-300x200.jpg"/>
      //
      //           </div>
      //
      //           <div className="card-action">
      //             <p>₩96,069 Bike and taste the best of Paris at your own pace.</p>
      //             <br></br>
      //             <a href="#" className="blue-text">상세보기</a> <p className="right orange-text">확정대기</p>
      //           </div>
      //
      //
      //           </div>
      //
      //         </div>
      //      </div>
      //
      //
      // )



        return(
          <div className="row cardContainer">
            {myReservedList(this.props.data)}
          </div>
        );
    }
}
MyReservedTravel.propTypes = propTypes;
MyReservedTravel.defaultProps = defaultProps;
export default MyReservedTravel;

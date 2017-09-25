import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { NavLink,reactDOMNode } from 'react-router-dom';


const propTypes = {
};
const defaultProps = {
};


class MyGuide extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount(){

    }

    render() {

      const myGuideTable = (data)=>{
        return data.map((openProgram,i)=>{
          return(
            <tr>
              <td><p> {openProgram.meeting_date} </p></td>
              <td> <a href="#" className="green-text"><span>3</span>명</a></td>
              <td><a href="#" className="orange-text"><span>3</span>명</a></td>
            </tr>
          )
        })
      }

      const myGuideList = (data)=>{
        return data.map((program,i)=>{
          return(
              <div className="row cardContainer ">
                <div className="col s4">

                  <div className="card ">

                    <div className="card-image">
                     <img src={program.img_url}/>

                    </div>

                    <div className="card-action">
                      <p>{program.start_time} - {program.end_time}</p>
                      <p><span><strong>₩{program.price}  </strong></span>{program.title}</p>
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
                        {myGuideTable(program.openList)}
                      </tbody>
                    </table>


                    <div className= 'col s1 offset-s6'>
                      <NavLink to='/'><button className="btn right marginT waves-effect waves-light ">일정추가</button></NavLink>

                    </div>
                 </div>
               </div>


          )
        })
      }




        return(
          <div>
            {myGuideList(this.props.data)}
            </div>
        );
    }
}
MyGuide.propTypes = propTypes;
MyGuide.defaultProps = defaultProps;
export default MyGuide;

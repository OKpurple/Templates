import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import { Button } from 'react-bootstrap';



const propTypes = {
};
const defaultProps = {
};


class MyGuide extends Component {
    constructor(props) {
        super(props);
        this.handleDetail = this.handleDetail.bind(this);
        this.openProgram = this.openProgram.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleDetail(e){
      let id=e.target.getAttribute('name');
      this.props.onMyProgramDetail(id);

    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(nextState);
        this.setState(nextState);
    }

    openProgram(e){
      let pid=e.target.getAttribute('name');
      let date = this.state[pid];
      if(date == 'undefined'){
        alert('날짜를 선택하세요');
      }else{
        this.props.onOpenProgram(pid,date);
      }
    }

    render() {

      const myGuideTable = (data)=>{
        return data.map((openProgram,i)=>{
          return(
            <tr>
              <td><p> {openProgram.meeting_date} </p></td>
              <td> <a href="#" className="green-text"><span>{openProgram.reservStatus_success}</span>명</a></td>
              <td><a href="#" className="orange-text"><span>{openProgram.reservStatus_wait}</span>명</a></td>
            </tr>
          )
        })
      }

      const myGuideList = (data)=>{
        return data.map((program)=>{
          return(
              <div key={program.program_id} className="row cardContainer ">

                <div className="col s8">
                  <div className="card ">
                    <div className="card-image">
                     <img src={program.img_url} width='100%' height='250px'/>
                    </div>

                    <div className="card-content">
                      <p className='card-title activator grey-text text-darken-4'>{program.title}</p>
                      <p>
                        <span className='right'>{program.start_time} - {program.end_time}</span>
                        <span>₩{program.price} </span>
                      </p>
                    </div>

                    <div className="card-action">

                      <a className="blue-text" name={program.program_id} onClick={this.handleDetail}>상세보기</a>
                      <p className="right"> 평점 <span> 3.5</span> 점</p>
                    </div>
                   </div>
                  </div>

                 <div className="col s4">

                   <div className='row'>
                     <table className="striped centered col s10 offset-s2">
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
                    </div>

                    <div className='row'>
                      <div>
                        <input className='col s6 offset-s2 center-align' type='date' name={program.program_id} onChange={this.handleChange}/>
                      </div>
                      <div>
                        <a className="btn right waves-effect waves-light" onClick = {this.openProgram} name={program.program_id}>일정추가</a>
                      </div>
                    </div>

                  </div>
               </div>


          )
        })
      }




        return(
          <div className='row'>
            {myGuideList(this.props.data)}
          </div>
        );
    }
}
MyGuide.propTypes = propTypes;
MyGuide.defaultProps = defaultProps;
export default MyGuide;

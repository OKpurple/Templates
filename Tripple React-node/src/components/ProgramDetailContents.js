import React, { Component, PropTypes } from 'react';
import { GoogleMap} from '../components';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';

const propTypes = {
};
const defaultProps = {
};
/*<span className="card-title black-text">내가 예약한 여행</span>*/
const carouselInstance = (
  <Carousel >
    <Carousel.Item>
      <img width={620} src="http://lorempixel.com/300/200/nightlife/2"/>
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img  width={620} src="http://lorempixel.com/300/200/nightlife/4"/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img  width={620} src="http://lorempixel.com/300/200/nightlife/5"/>
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

class ProgramDetailContents extends Component {
    constructor(props) {
        super(props);
    }
    render() {




        return(

          <div className="col s8">
            <h1>여행 제목은 여기에</h1>
            <h3><i className="material-icons">place</i>  <span>서울</span> </h3>
            <h3><i className="material-icons">access_time</i> <span>x</span>시간 </h3>
            <h3><i className="material-icons">people_outline</i> 최대<span>x</span>명 </h3>
            <h3><i className="material-icons">insert_invitation</i> <span>x</span>년 <span>x</span>월 <span>x</span>일 </h3>





            <div>
              <div className="divider"></div>
            </div>





            <div >
              <h4>프로그램 소개</h4>
              <h5>이 프로그램은 무슨무슨 컨셉으로 무엇을 목표로 한다. <br></br>
              어디 갓다가 또 어디 가서 뭘 체험하고 그러면서 뭘 느낄 수 있다. <br></br>
              우리가 살면서 이런 곳도 가보고 어쩌고 하면서 새로운 삶의 활력을 느낄 수 있다. </h5>
            </div>





            <div>
              <div className="divider"></div>
            </div>





            <div>
              <h4>일정 소개</h4>
                  {carouselInstance }
                  <h5>첫 번째 장소는 무엇을 알 수 있는 곳으로 무슨 일이 있었다. 이곳은 어쩌고 저쩌고 <br></br>
                  두 번째 장소는 사람들이 잘 몰랐던 곳인데 역사적으로 무슨 일이 있엇는데...<br></br>
                  마지막 코스는 여기인데 여기는 인기있는 무엇이 있고 다른 나라에서 이것을 보러 오기도 한다. </h5>
            </div>




            <div>
              <div className="divider"></div>
            </div>




            <div>
              <h4>모이는 장소</h4>
              <GoogleMap/>
              <h5> 서울 어디구 어디동 무슨 건물 혹은 무슨 역 앞입니다. <br></br>
              무슨 옷입고 어떤 깃발같은거 들고 있을테니까 찾아보세요.</h5>

            </div>
          </div>

        );
    }
}
ProgramDetailContents.propTypes = propTypes;
ProgramDetailContents.defaultProps = defaultProps;
export default ProgramDetailContents;

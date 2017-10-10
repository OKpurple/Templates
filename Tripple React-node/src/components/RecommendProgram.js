import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';
const propTypes = {
};
const defaultProps = {
};
class RecommendProgram extends Component {
    constructor(props) {
        super(props);
    }
    render() {

      const carousel = (
        <div className="col s4 " >
        <Carousel className="home_recommend">
          <Carousel.Item>
            <img width={400} src="http://211.253.24.106/images/asset/test1.jpeg"/>
            <Carousel.Caption>
              <h3>추천 여행지 1</h3>
              <p>즐거운 여행!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img  width={400} src="http://211.253.24.106/images/asset/test2.jpg"/>
            <Carousel.Caption>
              <h3>두번째 여행지</h3>
              <p>두번째 여행</p>
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
      </div>
    )

    const carousel1 = (
      <div className="col s4 " >
      <Carousel className="home_recommend">
        <Carousel.Item>
          <img width={400} src="http://211.253.24.106/images/asset/test3.png"/>
          <Carousel.Caption>
            <h3>추천 여행지 1</h3>
            <p>즐거운 여행!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img  width={400} src="http://211.253.24.106/images/asset/test4.png"/>
          <Carousel.Caption>
            <h3>두번째 여행지</h3>
            <p>두번째 여행</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    </div>
  )
  const carousel2 = (
    <div className="col s4 " >
    <Carousel className="home_recommend">
      <Carousel.Item>
        <img width={400} src="http://211.253.24.106/images/asset/test5.jpg"/>
        <Carousel.Caption>
          <h3>추천 여행지 1</h3>
          <p>즐거운 여행!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  width={400} src="http://211.253.24.106/images/asset/test6.jpg"/>
        <Carousel.Caption>
          <h3>두번째 여행지</h3>
          <p>두번째 여행</p>
        </Carousel.Caption>
      </Carousel.Item>
  </Carousel>
  </div>
)


        return(
            <div>
              {carousel}
              {carousel1}
              {carousel2}
            </div>
        );
    }
}
RecommendProgram.propTypes = propTypes;
RecommendProgram.defaultProps = defaultProps;
export default RecommendProgram;

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

      const carousel = (<Carousel className='col s4'>
        <Carousel.Item>
          <img width={400} src="http://lorempixel.com/300/200/nightlife/2"/>
          <Carousel.Caption>
            <h3>추천 여행지 1</h3>
            <p>즐거운 여행!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img  width={400} src="http://lorempixel.com/300/200/nightlife/4"/>
          <Carousel.Caption>
            <h3>두번째 여행지</h3>
            <p>두번째 여행</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img  width={400} src="http://lorempixel.com/300/200/nightlife/5"/>
          <Carousel.Caption>
            <h3>세번째 추천</h3>
            <p>세번쨰 추천해봅니다.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>)



        return(
            <div>
              {carousel}
              {carousel}
              {carousel}
            </div>
        );
    }
}
RecommendProgram.propTypes = propTypes;
RecommendProgram.defaultProps = defaultProps;
export default RecommendProgram;

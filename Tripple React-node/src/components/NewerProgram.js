import React, { Component, PropTypes } from 'react';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';
const propTypes = {
};
const defaultProps = {
};
class NewerProgram extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const carousel = (
        <div className="col s6" >
        <Carousel className="home_newer">
        <Carousel.Item>
          <img  width={620} src="http://211.253.24.106/images/asset/test6.jpg"/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img  width={620} src="http://211.253.24.106/images/asset/test7.jpg"/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>)

    const carousel1 = (
      <div className="col s6" >
      <Carousel className="home_newer">
      <Carousel.Item>
        <img  width={620} src="http://211.253.24.106/images/asset/test2.jpg"/>
        <Carousel.Caption>
          <h3>새로운 여행</h3>
          <p>새롭게 떠나자!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  width={620} src="http://211.253.24.106/images/asset/test1.png"/>
        <Carousel.Caption>
          <h3>진짜야?</h3>
          <p>ㅋㅋㅋ</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>)

        return(
          <div>
            {carousel}
            {carousel1}
          </div>
        );
    }
}
NewerProgram.propTypes = propTypes;
NewerProgram.defaultProps = defaultProps;
export default NewerProgram;

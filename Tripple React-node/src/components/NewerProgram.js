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
      const carousel = (<Carousel className='col s6'>
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
      </Carousel>)

        return(
          <div>
            {carousel}
            {carousel}
          </div>
        );
    }
}
NewerProgram.propTypes = propTypes;
NewerProgram.defaultProps = defaultProps;
export default NewerProgram;

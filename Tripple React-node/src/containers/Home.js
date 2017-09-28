import React, { Component, PropTypes } from 'react';
import { NewerProgram,SearchForm, GuideCardItem,RecommendProgram } from '../components';
import {Carousel} from 'react-bootstrap';

const propTypes = {
};
const defaultProps = {
};
class Home extends Component {
    constructor(props) {
        super(props);
        this.HandleSearch = this.HandleSearch.bind(this);
    }


    componentDidMount(){
      //키가져오기
      function getCookie(name) {
              var value = "; " + document.cookie;
              console.log(document.cookie);
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
          }

          // get loginData from cookie
          let loginData = getCookie('key');
          if(typeof loginData === "undefined") return;
          console.log('App Load key(login_id) = '+loginData);
    }

    HandleSearch(city, searchDate){

      this.props.history.push(`/SearchResult/`+city+`/`+searchDate);
    }

    render() {


        return(
          <div>
          <div className="backimg paddingT">
            <SearchForm onSearch = {this.HandleSearch}/>
          </div>
            <div className="container" id="recommend_div">
                <div className="row">
                  <h3>추천 여행</h3>
                  <RecommendProgram/>
                </div>
            </div>
            <div className="container">
                <div className="row">
                  <h3>신규 여행</h3>
                  <NewerProgram/>
                </div>
            </div>
          </div>


        );
    }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;

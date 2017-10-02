import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class SerachForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city : "undefined",
            searchDate: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        console.log(nextState);
        this.setState(nextState);
    }

    handleSearch() {
      //console.log(document.getElementById('searchPlace').value);
      //console.log(document.getElementById('searchDate').value);
      this.props.onSearch(this.state.city,this.state.searchDate);
    }


    componentDidMount(){
      const script = document.createElement('script');
      script.text = `function initAutocomplete() {
                        // 메인페이지에서 지도 검색시 도시까지만 출력되도록 국가는 kr
                        var options = {
                            types: ['(cities)'],
                            componentRestrictions: {country: 'kr'}
                        };
                        var inputGoogleMap = document.getElementById('searchPlace');
                        var searchBox = new google.maps.places.Autocomplete(inputGoogleMap,options);

                        searchBox.addListener('place_changed', function(){



                        });
                      }

                    `

      const script1 = document.createElement('script');
      script1.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5PIOp7E83jz9-EtbthhehmGKL9AAWeNU&libraries=places&callback=initAutocomplete"
      script1.async = true;
      this.instance.appendChild(script);
      this.instance.appendChild(script1);


    }

    render() {

        return(
          <div className="container" ref={el => (this.instance = el)}>
          <h2 className="marginB white-text">어디로 갈래요?</h2>
            <div className="row">
              <div className="col s5">
                <input name="city"
                 className = "white-text"
                 id = "searchPlace"
                 placeholder="City"
                 type="text"
                 onChange={this.handleChange}
                 />
               </div>
              <div className="col s5 white-text">
                <input name="searchDate"
                 className = "white-text"
                 id = "searchDate"
                 type="date"
                 onChange={this.handleChange}
                 />
              </div>
              <button className="col s2 btn waves-effect waves-light blue-grey darken-1" onClick={this.handleSearch}> 검색 </button>
            </div>
           </div>
        );
    }
}
SerachForm.propTypes = propTypes;
SerachForm.defaultProps = defaultProps;
export default SerachForm;

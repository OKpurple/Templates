import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class SerachForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city : "",
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

    handleSearch(){
      console.log('searchform'+this.state.city,this.state.searchDate);
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
                          inputGoogleMap.value = '꺼져'
                          //searchBox.getPlace().formatted_address;

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
          <div className="container search" ref={el => (this.instance = el)}>
          <h2 className="marginB">어디로 갈래요?</h2>
          <div className="row">
            <div className="col s5">
              <input name="city"
               id = "searchPlace"
               placeholder="City"
               type="text"
               onChange={this.handleChange}
               />
             </div>
            <div className="col s5">
              <input name="searchDate"
               type="date"
               onChange={this.handleChange}
               />
            </div>
          <button className="col s2 btn waves-effect waves-light red lighten-3"
          onClick = {this.handleSearch}> 검색 </button>
           </div>
           </div>
        );
    }
}
SerachForm.propTypes = propTypes;
SerachForm.defaultProps = defaultProps;
export default SerachForm;

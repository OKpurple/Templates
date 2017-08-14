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
      this.props.onSearch();
    }

    render() {

        return(
          <div className="container search">
          <h2 className="marginB">어디로 갈래요?</h2>
          <div className="row">
            <div className="col s5">
              <input name="city"
               id = "searchPlace"
               placeholder="City"
               type="text"
               onChange={this.handleChange}
               value={this.state.username}/>
             </div>
            <div className="col s5">
              <input name="searchDate"
               type="date"
               onChange={this.handleChange}
               value={this.state.username}/>
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

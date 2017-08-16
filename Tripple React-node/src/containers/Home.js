import React, { Component, PropTypes } from 'react';
import { SearchForm } from '../components';
const propTypes = {
};
const defaultProps = {
};
class Home extends Component {
    constructor(props) {
        super(props);
        this.HandleSearch = this.HandleSearch.bind(this);
    }

    HandleSearch(){
      this.props.history.push("/SearchResult");
    }

    render() {
        return(
          
            <SearchForm
            onSearch = {this.HandleSearch}/>

        );
    }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;

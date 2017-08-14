import React, { Component, PropTypes } from 'react';
import { GuideCardItem } from '../components'
const propTypes = {
};
const defaultProps = {
};
class SearchResult extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
        <div>
          <GuideCardItem/>
        </div>
        );
    }
}
SearchResult.propTypes = propTypes;
SearchResult.defaultProps = defaultProps;
export default SearchResult;

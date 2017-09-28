import React, { Component, PropTypes } from 'react';

const propTypes = {
};
const defaultProps = {
};
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {



        return(
          <div>
            <footer className="page-footer blue-grey darken-3" id="foot">
              <div className="container">
                <div className="row">
                  <div className="col s6">
                    <h5 className="white-text">Probono Trippleday</h5>
                    <p >You can travel in hidden place</p>

                  </div>
                  <div className="col s6">
                    <h5 className="right-align">© 2017 Copyright Text</h5>


                  </div>

                </div>
              </div>

            </footer>
          </div>
        );
    }
}
Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;
export default Footer;

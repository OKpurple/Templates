import React, { Component, PropTypes } from 'react';
import { Footer,Header } from '../components';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import {Test,Login, Home, Register,SearchResult,CreateProgram,
  CreateMeetPlace,CreateDetail,CreatePDetail,Program, TravelList, MyPage, MyTrip, Review, WishList, ProgramDetail} from '../containers';
import {logoutRequest} from '../actions/login';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000);

                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }


    render(){

        let isAuth = false;
        return (
          <Router>
             <div>


             {isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                               onLogout={this.handleLogout}/>}


                      <Switch>
                          <Route exact path="/" component={Home}/>
                          <Route path="/Test" component={Test}/>
                          <Route path="/Login" component={Login}/>
                          <Route path="/Register" component={Register}/>
                          <Route path="/SearchResult/:city/:searchDate" component={SearchResult}/>
                          <Route path="/SearchResult/:city/" component={SearchResult}/>
                          <Route path="/SearchResult" component={SearchResult}/>
                          <Route path="/CreateProgram" component={CreateProgram}/>
                          <Route path="/CreateMeetPlace" component={CreateMeetPlace}/>
                          <Route path="/CreateDetail" component={CreateDetail}/>
                          <Route path="/CreatePDetail" component={CreatePDetail}/>
                          <Route path="/Program" component={Program}/>
                          <Route path="/TravelList" component={TravelList}/>
                          <Route path="/MyPage" component={MyPage}/>
                          <Route path="/WishList" component={WishList}/>
                          <Route path="/ProgramDetail/:open_program_id" component={ProgramDetail}/>
                          <Route path="/ProgramDetail" component={ProgramDetail}/>
                      </Switch>

                    <Footer/>



            </div>
         </Router>

        );
    };
};


const mapStateToProps = (state) => {
    return {
        status: state.Login.status
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
    logoutRequest : ()=>{
      return dispatch(logoutRequest());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

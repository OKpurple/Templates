import React, { Component, PropTypes } from 'react';
import { Header } from '../components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login, Home, Register,SearchResult,CreateProgram,
  CreateMeetPlace,CreateDetail,CreatePDetail,Program, TravelList, MyPage, MyTrip, Review, WishList, ProgramDetail} from '../containers';
import {logoutRequest} from '../actions/login';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    // function getCookie(name) {
    //         var value = "; " + document.cookie;
    //         var parts = value.split("; " + name + "=");
    //         if (parts.length == 2) return parts.pop().split(";").shift();
    //     }
    //
    //     // get loginData from cookie
    //     let loginData = getCookie('key');
    //     if(typeof loginData === "undefined") return;
    //     console.log('App Load key(login_id) = '+key);
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
        console.log(this.props.location);
        return (
          <Router>
             <div>

                {isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                                  onLogout={this.handleLogout}/>}

                    <div >
                      <Switch>
                          <Route exact path="/" component={Home}/>
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
                          <Route path="/MyTrip" component={MyTrip}/>
                          <Route path="/Review" component={Review}/>
                          <Route path="/WishList" component={WishList}/>
                          <Route path="/ProgramDetail" component={ProgramDetail}/>
                      </Switch>
                    </div>


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

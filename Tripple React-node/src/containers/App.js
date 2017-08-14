import React, { Component, PropTypes } from 'react';
import { Header } from '../components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login, Home, Register,SearchResult} from '../containers'
class App extends Component {
  constructor(props){
    super(props);
  }
    render(){

        let isAuth = false;
        console.log(this.props.location);
        return (
          <Router>
             <div>
                {isAuth ? undefined : <Header/>}
                 <div>
                     <Switch>
                         <Route exact path="/" component={Home}/>
                         <Route path="/Login" component={Login}/>
                         <Route path="/Register" component={Register}/>
                         <Route path="/SearchResult" component={SearchResult}/>
                     </Switch>
                 </div>
             </div>
         </Router>

        );
    };
};

export default App;

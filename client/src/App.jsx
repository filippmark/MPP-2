import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Global/Navbar/Navbar';
import { AuthContext } from './context';
import './App.css';
import openSocket from 'socket.io-client';

export const socket = openSocket('ws://localhost:8080', {transports: ['websocket']});


class App extends Component {

  state = {
    isAuthorised: true,
    jwt: null
  }

  componentDidMount(){
    const jwt = localStorage.getItem('jwt');

    console.log(jwt);

    if(jwt){
      this.setState({isAuthorised: true, jwt})
    }
  }

  componentWillUnmount(){
    socket.close();
  }

  setAuthorised = (isAuthorised) => {
    this.setState({
      isAuthorised
    });
  }

  setJwt = (jwt) => {
    this.setState({
      ...this.state,
      jwt
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AuthContext.Provider value={{ jwt: this.state.jwt, isAuthorised: this.state.isAuthorised, setAuthorised: this.setAuthorised, setJWT:  this.setJwt}}>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" render={props => <Home {...props}></Home>} />
              <Route path="/sign-in" render={props => <SignIn {...props}></SignIn>} />
              <Route path="/sign-up" render={props => <SignUp {...props}></SignUp>} />
            </Switch>
          </AuthContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
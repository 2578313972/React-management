import React from 'react';
import { BrowserRouter as Router,Route,Redirect } from "react-router-dom";

import {Login_Register} from './components/login-registration/login-registration'
import {Index} from './components/index/index'

import './App.css';
export default class App extends React.Component{
  constructor(data){
    super()
  }
  componentDidMount(){
    // console.log(this.data)
  }
  render() {
    return(
      <Router>
        <Route path="/login-and-registration" component={Login_Register} />
        <Route path="/index" component={Index} />
        {/* <Redirect to="/index" from="/" /> */}
      </Router>
    )
  }
}

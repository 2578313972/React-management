import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";

import { Layout } from 'antd';
import './login-registration.css';

import {Login} from './login/login'
import {Register} from './register/register'

const { Header , Content } = Layout;

export class Login_Register extends React.Component{
    constructor(data){
        super()
        this.state = {
            url:""
        }
    }
    componentDidMount(){
        this.setState({url:this.props.location.pathname},()=>{
            console.log(this.state.url)
        })
    }
    render() {
        return(
            <div className="logreg">
                <Layout>
                    <Header>学生管理系统</Header>
                    <Content>
                        <Router>
                            <Route exact path="/login-and-registration" component={Login}></Route>
                            <Route path="/login-and-registration/register" component={Register}></Route>
                        </Router>
                    </Content>
                </Layout>
            </div>
        )
    }
}
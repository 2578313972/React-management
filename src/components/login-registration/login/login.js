import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom'

import './login.css'
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export class Login extends React.Component{
    constructor(data){
        super()
        this.state = {
            name:"",
            pwd:""
        }
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
        axios.get(`http://localhost:1020/examine`,{
            params: {
              name: values.username,
              pwd: values.password
            }
        }).then(res=>{
            message.loading('正在为您检测……',1,()=>{
                setTimeout(()=>{
                    if(res.data === "Name_No"){
                        message.warning('请输入正确的用户名!!!',3);
                    }else if(res.data === "Pwd_No"){
                        message.error('密码错误!',3);
                    }else{
                        message.success('登录成功！正在为您跳转……',1.5,()=>{
                            sessionStorage.setItem("name",this.state.name)
                            this.props.history.replace("/index")
                        })
                    }
                },400)
            })
        })
    };
    nameVal=(e)=>{ //账号
        e.target.value = e.target.value.replace(/\s*/g,"")
        this.setState({name:e.target.value},()=>console.log(this.state.name))
    }
    pwdVal=(e)=>{ // 密码
        this.setState({pwd:e.target.value},()=>console.log(this.state.pwd))
    }
    render(){
        return(
            <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish} >
                <Form.Item name="username" rules={[{ required: true, message: '请输入您的账号!' },{pattern:/\w{4,16}/, message: '账号格式不正确!(字符4~16)'}]}>
                    <Input onChange={this.nameVal} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入您的密码!' },{pattern:/\w{4,}/, message: '密码格式不正确!'}]} >
                    <Input onChange={this.pwdVal} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入您的密码!" />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href=""> 忘记密码 </a>
                </Form.Item>

                <Form.Item>
                    <Button onClick={this.submit} type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
                     或
                    <Link to="/login-and-registration/register">注册</Link>
                </Form.Item>
            </Form>
        )
    }
}
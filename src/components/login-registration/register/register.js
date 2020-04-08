import React from 'react';
import axios from 'axios'
import './register.css'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export class Register extends React.Component{
    constructor(data){
        super()
        this.state = {
            name:"",
            pwd:""
        }
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
        axios.get("http://localhost:1020/register",{
            params: {
              name: values.username,
              pwd: values.password
            }
        }).then(res=>{
            message.loading('正在为您检测……',1,()=>{
                setTimeout(()=>{
                    if(res.data === "No"){
                        message.info('该账号已被注册!',3);
                    }else{
                        message.success('注册成功！正在为您跳转到登录页面……',1.5,()=>{
                            this.props.history.replace("/login-and-registration")
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

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: '不能为空!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('两次密码输入不一致!');
                        },
                    }),
                    ]}
                >
                    <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />}  placeholder="请确认您的密码!" />
                </Form.Item>

                <Form.Item>
                    <Button  type="primary" htmlType="submit" className="login-form-button"> 注册 </Button>
                </Form.Item>
            </Form>
        )
    }
}
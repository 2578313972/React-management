import React from 'react';
import axios from 'axios'
import './register.css'
import { Form, Input, Button, Checkbox } from 'antd';
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
            console.log(res)
            if(res.data === "Yes"){
                this.props.history.replace("/login-and-registration")
            }else{
                alert()
            }
        })
    };
    nameVal=(e)=>{ //账号
        e.target.value = e.target.value.replace(/\s*/g,"")
        this.setState({name:e.target.value},()=>console.log(this.state.name))
    }
    pwdVal=(e)=>{ // 密码
        this.setState({pwd:e.target.value},()=>console.log(this.state.pwd))
    }
    submit = () => {
        axios.get("http://localhost:1020/register",{
            params: {
              name: this.state.name,
              pwd: this.state.pwd
            }
        }).then(res=>{
            if(res === "Yes"){
                this.props.history.replace("/login-and-registration")
            }
        })
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
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button  type="primary" htmlType="submit" className="login-form-button"> 注册 </Button>
                </Form.Item>
            </Form>
        )
    }
}
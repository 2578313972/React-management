import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Route,Link ,Switch} from "react-router-dom";
import { Layout,Avatar,Menu, Dropdown,SubMenu,Breadcrumb  } from 'antd';
import './index.css'
import { UserOutlined,DownOutlined } from '@ant-design/icons';
const { Header , Sider, Content } = Layout;
const menu = (
<Menu>
    <Menu.Item>
            <Link rel="noopener noreferrer"  to="/index/only">全部成员</Link>
    </Menu.Item>
    <Menu.Item>
            <Link rel="noopener noreferrer"  to="/index/upPwd">修改密码</Link>
    </Menu.Item>
    <Menu.Item>
            <Link rel="noopener noreferrer"  to="/login-and-registration">退出登录</Link>
    </Menu.Item>
</Menu>
);
export class Index extends React.Component{
    constructor(props){
        super()
        this.state={
            name:""
        }
    }
    componentDidMount(){
        console.log(this.props)
        // Object.defineProperty(this.props.location,pathname,{
            // get(){
            //     return this.props.location[pathname]
            // },
            // set(newVal){
            //     this.props.location[pathname] = newVal
            //     console.log(5555555555555555555555555555555555)
            // }
        // })
        // this.setState({
        //     name:sessionStorage.getItem("name")
        // }){}
    }
    render(){
        return(
            <div className="Index">
                <Layout>
                    <Header>
                        <div>学生管理系统</div>
                        <div>
                            <Dropdown overlayClassName="" overlay={menu}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />{this.state.name}
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu>
                                <Menu.Item><Link to="/index/allData">全部成员</Link></Menu.Item>
                                <Menu.Item><Link to="/index/only">个人信息</Link></Menu.Item>
                                <Menu.Item><Link to="/index/upPwd">修改密码</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content>
                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="">Application Center</a>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <Switch>
                                <Route exact path="/index" component={require("../allData/allData").AllData}></Route>
                                <Route path="/index/allData" component={require("../allData/allData").AllData}></Route>
                                <Route path="/index/only" component={require("../only/only").Only}></Route>
                                <Route path="/index/upPwd" component={require("../upPwd/upPwd").UpPwd}></Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
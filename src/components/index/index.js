import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Route,Link ,Switch} from "react-router-dom";
import { Layout,Avatar,Menu, Dropdown,SubMenu,Breadcrumb  } from 'antd';
import './index.css'
import { UserOutlined,DownOutlined } from '@ant-design/icons';
const { Header , Sider, Content } = Layout;

export class Index extends React.Component{
    constructor(props){
        super()
        this.state={
            name:"",
            route:'',
            routeName:''
        }
    }
    componentDidMount(){
        this.props.history.listen(route => {
            let name = ""
            if(route.pathname==="/index/allData") name = "全部成员"
            if(route.pathname==="/index/only") name = "个人信息"
            if(route.pathname==="/index/upPwd") name = "修改密码"
            this.setState({routeName:name})
        })
        console.log(this.props)
        this.setState({
            name:sessionStorage.getItem("name")
        })
    }
    menu(){
        return  <Menu>
                    <Menu.Item>
                            <Link rel="noopener noreferrer"  to="/index/allData">全部成员</Link>
                    </Menu.Item>
                    <Menu.Item>
                            <Link rel="noopener noreferrer"  to="/index/upPwd">修改密码</Link>
                    </Menu.Item>
                    <Menu.Item>
                            <Link rel="noopener noreferrer"  to="/login-and-registration">退出登录</Link>
                    </Menu.Item>
                </Menu>
    }
    render(){
        return(
            <div className="Index">
                <Layout>
                    <Header>
                        <div onClick={()=>{this.props.history.replace("/index")}}>学生管理系统</div>
                        <div>
                            <Dropdown overlayClassName="" overlay={this.menu}>
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
                                <Breadcrumb.Item><Link to="/index">首页</Link></Breadcrumb.Item>
                                {<Breadcrumb.Item>{this.state.routeName}</Breadcrumb.Item>}
                            </Breadcrumb>
                            <Switch>
                                <Route exact path="/index" component={require("../firData/firData").FirData}></Route>
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
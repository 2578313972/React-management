import React from 'react';
import axios from 'axios'
import { Input,Button,message } from 'antd';
import "./upPwd.css"
export class UpPwd extends React.Component{
    constructor(props){
        super()
        this.state={
            id:'',
            name:'',
            newName:"",
            pwd:'',
            loading: false,
            iconLoading: false,
        }
    }

      enterIconLoading = () => {
        this.setState({ iconLoading: true },()=>{
            axios.get(`http://localhost:1020/checkout?name=${this.state.name}&&newName=${this.state.newName}&&newPwd=${this.state.pwd}`).then(res=>{
                console.log(res)
                setTimeout(() => {
                    sessionStorage.setItem("name",this.state.newName)
                    message.success('修改成功！')
                    this.props.history.go()
                    this.setState({iconLoading: false})
                }, 800);
            })

        });
      };
    componentDidMount(){
        axios.get(`http://localhost:1020/onlyData?name=${sessionStorage.getItem("name")}`).then(res=>{
            this.setState({
                id:res.data.id,
                name:res.data.name,
                newName:res.data.name,
                pwd:res.data.pwd
            })
        })
    }
    checkName=(e)=>{
        this.setState({
            newName:e.target.value
        })
    }
    checkPwd=(e)=>{
        this.setState({
            pwd:e.target.value
        })
    }
    render(){
        return(
            <div className="upPwd">
                <div className="box">
                    <div>编号</div>
                    <div><Input disabled value={this.state.id} /></div>
                </div>
                <div className="box">
                    <div>账户</div>
                    <div><Input onChange={this.checkName} value={this.state.newName} /></div>
                </div>
                <div className="box">
                    <div>密码</div>
                    <div><Input onChange={this.checkPwd} value={this.state.pwd} /></div>
                </div>
                <div className="bun">
                <Button
                type="primary"
                loading={this.state.iconLoading}
                onClick={this.enterIconLoading}
                >
                确定修改
                </Button>
                </div>
            </div>
        )
    }
}
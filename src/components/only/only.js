import React from 'react';
import axios from 'axios'
import { Input } from 'antd';
import "./only.css"
export class Only extends React.Component{
    constructor(props){
        super()
        this.state={
            id:'',
            name:'',
            pwd:''
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:1020/onlyData?name=${sessionStorage.getItem("name")}`).then(res=>{
            console.log(res)
            this.setState({
                id:res.data.id,
                name:res.data.name,
                pwd:res.data.pwd
            })
        })
    }
    render(){
        return(
            <div className="only">
                <div className="box">
                    <div>编号</div>
                    <div><Input disabled value={this.state.id} /></div>
                </div>
                <div className="box">
                    <div>账户</div>
                    <div><Input disabled value={this.state.name} /></div>
                </div>
                <div className="box">
                    <div>密码</div>
                    <div><Input disabled value={this.state.pwd} /></div>
                </div>
            </div>
        )
    }
}
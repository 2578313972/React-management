import React from 'react';
import axios from 'axios'
import './allData.css'
import { Modal, Button,Table, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';



const { Column, ColumnGroup } = Table;
const { confirm } = Modal;

export class AllData extends React.Component{
    constructor(props){
        super()
        this.state = {
            data:[],
            showData:[]
        }
    }
    componentDidMount(){
        axios.get("http://120.77.99.3:1020/allData").then(res=>{
            console.log(res)
             this.setState({data:res.data},()=>{
                let bal = []
                this.state.data.forEach((item,index)=>{
                    bal.push({key: index,index:item.id,Name: item.name,pwd: item.pwd,})
                })
                this.setState({
                    showData:bal
                })
             })
        }).catch(err=>{
            console.log(err)
        })
    }
    showConfirm = (e) => { //asdasdasdasd
        let that = this
        confirm({
          title: '你确定要删除这个账号吗?',
          icon: <ExclamationCircleOutlined />,
          content: '删除此数据后将无法恢复，后果自负！',
          onOk(){
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve(e)
                },800+Math.random()*1000)
            }).then((e)=>{
                axios.get(`http://120.77.99.3:1020/deleteData`,{
                    params: {
                    name: e.Name
                    }
                }).then(res=>{
                    console.log(res)
                    that.componentDidMount()
                })
            })
          },
          onCancel() {console.log('已取消删除')},
        });
      }
    render(){
        return(
            <div className="allData">
                <Table dataSource={this.state.showData} pagination={false}>
                    <Column title="编号" dataIndex="index" key="index" />
                    <Column title="姓名" dataIndex="Name" key="Name" />
                    <Column title="密码" dataIndex="pwd" key="pwd" />
                    <Column title="操作" key="action"
                    render={(text, record) => (
                        <span>
                        <a style={{ marginRight: 16 }}>编辑</a>
                        <a onClick={()=>{this.showConfirm(record)}} >删除</a>
                        </span>
                    )} />
                </Table>
            </div>
        )
    }
}
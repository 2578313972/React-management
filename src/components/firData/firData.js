import React, { Component } from 'react';
import axios from 'axios'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export class FirData extends Component {
    constructor(props){
        super()
        this.state = {
            id:[],
            name:[]
        }
    }
    componentDidMount() {
        axios.get("http://120.77.99.3:1020/allData").then(res=>{
            console.log(res)
            let a = [] 
            let b = [] 
            res.data.forEach(item => {
                a.push(item.id)
                b.push(item.name)
            });
            this.setState({id:a,name:b})
        }).then(()=>{
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            console.log(this.state.id)
            myChart.setOption({
                title: { text: '可视数据' },
                tooltip: {},
                xAxis: {
                    data: this.state.name
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: this.state.id
                }]
            });
        })
        
    }
    render() {
        return (
            <div id="main" style={{ width: 800, height: 700 ,margin:80}}></div>
        );
    }
}
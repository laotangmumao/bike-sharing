import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from '../echartTheme'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
export default class Line extends Component {

    componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme);

    }

    getOption = () => {
        let option = {
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,2000,1500,3000,2544,9000,5000
                    ]
                }
            ],
            

        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type:'line',
                    data:[
                        13500,12000,11500,13000,12544,9000,15000
                    ]
                },
                {
                    name:'摩拜',
                    type:'line',
                    data:[
                        13255,10015,9852,11150,13055,10020,12500
                    ]
                },
                {
                    name:'小蓝',
                    type:'line',
                    data:[
                        8056,10050,7300,10450,15026,9000,13005
                    ]
                }
            ],
            

        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                type:'category',
                boundaryGop:false,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,2000,1500,3000,2544,9000,5000
                    ],
                    areaStyle:{}
                }
            ],
            

        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title='折线图表之一'>
                    <ReactEcharts option={this.getOption()} theme='Imooc' style={{height:500}} />
                </Card>
                <Card title='折线图表之二'style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{height:500}} />
                </Card>
                <Card title='折线图表之三'style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme='Imooc' style={{height:500}} />
                </Card>
            </div>
        )
    }
}

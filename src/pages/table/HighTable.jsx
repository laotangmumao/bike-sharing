import React, { Component } from 'react'
import {Card,Table , Modal, message,Button ,Pagination , Badge } from 'antd';
import Axios from './../../axios/index';
import utils from '../../Utils/utils';

export default class HighTable extends Component {
    state={}
    params = {
        page:1
    }
    componentDidMount(){
        this.request();
    }
    handleChange = (pagination,filters,sorter) => {
        console.log(sorter);
        this.setState({
            sortOrder:sorter.order
        })
    }
    handdleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title:'确认删除',
            content:'您确认要删除此条数据吗',
            onOk:()=>{
                message.success('删除成功')
                this.request()
            }
        })
    }
    request = () => {
        let _this = this
        Axios.ajax({
            url:'/table/high/list',
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code == "0"){
                res.result.list.map((item,index)=>{
                    item.key=index
                })
                this.setState({
                    dataSource:res.result.list,
                })
            }
        })
    }
    render() {
        let {dataSource} = this.state
        
        const columns = [
            {
                //表头需要显示的内容
                title:'id',
                //返回的索引值
                width:50,
                align:'center',
                dataIndex:'id'
            },
            {
                //表头需要显示的内容
                title:'用户名',
                width:80,
                align:'center',
                //返回的索引值，字段的属性值，比如说用户名这个
                //字段 对应的是哪个字段，现在这个就是userName
                dataIndex:'userName'
            },
            {
                title:'性别',
                width:50,
                align:'center',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ?'男':'女'
                }
            },
            {
                title:'状态',
                width:120,
                align:'center',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'努力努力在努力',
                        '2':'奋斗奋斗奋斗奋斗',
                        '3':'坚强坚强坚强坚强坚',
                        '4':'阿里FE',
                        '5':'创业者',
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                width:80,
                align:'center',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':'敲代码',
                        '2':'学习',
                        '3':'读书',
                        '4':'旅游',
                        '5':'音乐',
                        '6':'运动',
                        '7':'天文',
                        '8':'科学',
                        '9':'爬山',
                        '10':'骑行',
                    }
                    return config[interest]
                }
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                width:140,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                align:'center',
                width:80,
                dataIndex:'time'
            }
        ]
        const columns2 = [
            {
                //表头需要显示的内容
                title:'id',
                //返回的索引值
                width:50,
                fixed:"left",
                align:'center',
                dataIndex:'id'
            },
            {
                //表头需要显示的内容
                title:'用户名',
                width:80,
                fixed:"left",
                align:'center',
                //返回的索引值，字段的属性值，比如说用户名这个
                //字段 对应的是哪个字段，现在这个就是userName
                dataIndex:'userName'
            },
            {
                title:'性别',
                width:50,
                align:'center',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ?'男':'女'
                }
            },
            {
                title:'状态',
                width:120,
                align:'center',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'努力努力在努力',
                        '2':'奋斗奋斗奋斗奋斗',
                        '3':'坚强坚强坚强坚强坚',
                        '4':'阿里FE',
                        '5':'创业者',
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                width:80,
                align:'center',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':'敲代码',
                        '2':'学习',
                        '3':'读书',
                        '4':'旅游',
                        '5':'音乐',
                        '6':'运动',
                        '7':'天文',
                        '8':'科学',
                        '9':'爬山',
                        '10':'骑行',
                    }
                    return config[interest]
                }
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                align:'center',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'地址',
                width:140,
                dataIndex:'address'
            },
            {
                title:'早起时间',
                align:'center',
                width:80,
                dataIndex:'time'
            }
        ]
        const columns3 = [
            {
                //表头需要显示的内容
                title:'id',
                //返回的索引值
                align:'center',
                dataIndex:'id'
            },
            {
                //表头需要显示的内容
                title:'用户名',
                align:'center',
                //返回的索引值，字段的属性值，比如说用户名这个
                //字段 对应的是哪个字段，现在这个就是userName
                dataIndex:'userName'
            },
            {
                title:'性别',
                align:'center',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ?'男':'女'
                }
            },
            {
                title:'年龄',
                align:'center',
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                },
                sortOrder:this.state.sortOrder
                
            },
            {
                title:'状态',
                align:'center',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'努力努力在努力',
                        '2':'奋斗奋斗奋斗奋斗',
                        '3':'坚强坚强坚强坚强坚',
                        '4':'阿里FE',
                        '5':'创业者',
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                align:'center',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':'敲代码',
                        '2':'学习',
                        '3':'读书',
                        '4':'旅游',
                        '5':'音乐',
                        '6':'运动',
                        '7':'天文',
                        '8':'科学',
                        '9':'爬山',
                        '10':'骑行',
                    }
                    return config[interest]
                }
            },
            {
                title:'生日',
                align:'center',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                align:'center',
                dataIndex:'time'
            }
        ]
        const columns4 = [
            {
                //表头需要显示的内容
                title:'id',
                //返回的索引值
                align:'center',
                dataIndex:'id'
            },
            {
                //表头需要显示的内容
                title:'用户名',
                align:'center',
                //返回的索引值，字段的属性值，比如说用户名这个
                //字段 对应的是哪个字段，现在这个就是userName
                dataIndex:'userName'
            },
            {
                title:'性别',
                align:'center',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ?'男':'女'
                }
            },
            {
                title:'年龄',
                align:'center',
                dataIndex:'age',
            },
            {
                title:'状态',
                align:'center',
                //Badge
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'努力努力在努力',
                        '2':'奋斗奋斗奋斗奋斗',
                        '3':'坚强坚强坚强坚强坚',
                        '4':'阿里FE',
                        '5':'创业者',
                    }
                    return config[state]
                }
            },
            {
                title:'爱好',
                align:'center',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':<Badge status='success' text='敲代码'/>,
                        '2':<Badge status='error' text="学习" />,
                        '3':<Badge status='processing' text="读书" />,
                        '4':<Badge status='warning' text="旅游" />,
                        '5':<Badge status='default' text="音乐" />,
                        '6':<Badge status='success' text="运动" />,
                        '7':<Badge status='processing' text="天文" />,
                        '8':<Badge status='success' text="科学" />,
                        '9':<Badge status='warning' text="爬山" />,
                        '10':<Badge status='error' text="骑行" />,
                    }
                    return config[interest]
                }
            },
            {
                title:'生日',
                align:'center',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'操作',
                align:'center',
                render : (text,item) => {
                    return <button  onClick={(item)=>{this.handdleDelete(item)}}>删除</button>
                }
            }
        ]
        return (
            <div>
                <Card title='头部固定' style={{margin:'10px 0px'}}>
                    <Table 
                        //边框
                        bordered 
                        columns={columns}
                        dataSource={dataSource}
                        //分页
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title='左侧固定' style={{margin:'10px 0px'}}>
                    <Table                         
                        bordered
                        columns={columns2}
                        dataSource={dataSource}
                        //分页
                        pagination={false}
                        scroll={{x:4300,y:300}}
                    />
                </Card>
                <Card title='表格排序' style={{margin:'10px 0px'}}>
                    <Table                         
                        bordered
                        columns={columns3}
                        dataSource={dataSource}
                        //分页
                        pagination={false}
                        
                        //排序函数，本地排序使用一个函数（参考  Array.sort 的 compareFunction），
                        //需要服务端排序可以设为 true
                        //sorter
                        //排序的受控属性，外界可用次控制列的排序，可设置为
                        //'ascend','descend','false'
                        //sortOrder
                        //分页排序筛选变化时触发
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title='操作按钮' style={{margin:'10px 0px'}}>
                    <Table                         
                        bordered
                        columns={columns4}
                        dataSource={dataSource}
                        //分页
                        pagination={false}
                        
                    />
                </Card>
            </div>
        )
    }
}

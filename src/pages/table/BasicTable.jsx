import React, { Component } from 'react'
import {Card,Table , Modal, message,Button ,Pagination  } from 'antd';
import Axios from './../../axios/index';
import utils from '../../Utils/utils';
export default class BasicTable extends Component {
    state={dataSource2:[]}
    componentDidMount(){
        //数据源
        const dataSource = [
            {
                id:'0',
                userName:'jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'1996-04-20',
                address:'河北省石家庄市',
                time:'09:00'
            },
            {
                id:'1',
                userName:'Tom',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'1999-02-27',
                address:'河北省唐山市',
                time:'09:00'
            },
            {
                id:'2',
                userName:'Jerry',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'1999-02-27',
                address:'河北省唐山市',
                time:'09:00'
            }
            
        ]
        dataSource.map((item,index)=>{
            item.key=index; 
        })
        this.setState({dataSource})
        this.request()
    }
    params = {
        page:1
    }
    //动态获取MOCK数据
    request = () => {
        let _this = this
        Axios.ajax({
            url:'/table/list',
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
                    dataSource2:res.result.list,
                    selectedRows:null,
                    selectedRowKeys:[],
                    pagination:utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    //单选 获取数据
    onRowClick = (recode,index) => {
        let selectKey = [index];
        Modal.info({
            title:"信息",
            content:`用户名：${recode.userName} , 性别：${recode.sex == 1?'男':'女'}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:recode
        })
    }
    
    // add = () => {
    //     let item = this.state.selectedItem;
    //     if(item.id){

    //     }
    // }
    //多选执行删除动作
    handleDelete = (() => {
        let rows = this.state.selectedRows
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content: `您确定要删除这些数据吗 ${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    })
    render() {
        let {dataSource,dataSource2 } = this.state
        //表格列的配置描述
        const columns = [
            {
                //表头需要显示的内容
                title:'id',
                //返回的索引值
                dataIndex:'id'
            },
            {
                //表头需要显示的内容
                title:'用户名',
                //返回的索引值，字段的属性值，比如说用户名这个
                //字段 对应的是哪个字段，现在这个就是userName
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex == 1 ?'男':'女'
                }
            },
            {
                title:'状态',
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
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]
        const {selectedRowKeys} = this.state
        const rowSelection = {
            // 列表是否可选
            //里面的key值 type 可以定义单选还是多选
            //checkbox or radio
            type:'radio',
            //指定选中的key数组，需要和 onChange 进行配合 
            // sting[]   []
            selectedRowKeys,
            //选项发生变化时回调 
            //onSelect 用户手动选择/取消选择某列的回调
            //functoin(selectRowKeys,selectRows)
            // onChange
            
        }
        //复选框的
        const rowCheckSelection = {
            type:'checked',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // let ids = [];
                // selectedRows.map((item)=>{
                //     ids.push(item.id)
                // })
                this.setState({
                    selectedRowKeys,
                    //id 不是必选的
                    // selectedIds:id
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title='基础表格'>
                    {/* 自闭和方式，通过一些属性完成表格基础功能 */}
                    <Table 
                        //边框
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        //分页
                        pagination={false}
                    />
                </Card>
                <Card title='动态数据渲染表格-Mock' style={{margin:'10px 0px'}}>
                    {/* 自闭和方式，通过一些属性完成表格基础功能 */}
                    <Table 
                        //边框
                        bordered 
                        columns={columns}
                        dataSource={dataSource2}
                        //分页
                        
                    />
                </Card>
                <Card title='Mock-单选' style={{margin:'10px 0px'}}>
                    {/* 自闭和方式，通过一些属性完成表格基础功能 */}
                    <Table 
                        //边框
                        bordered
                        // 列表是否可选
                        //里面的key值 type 可以定义单选还是多选
                        //checkbox or radio
                        rowSelection={rowSelection}
                        //可以接受一个 回调函数
                        //可以得到当前这一行的数据
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index)
                                },
                            }
                        }}
                        columns={columns}
                        dataSource={dataSource2}
                        //分页
                        
                    />
                </Card>
                <Card title='Mock-复选框' style={{margin:'10px 0px'}}>
                    {/* 自闭和方式，通过一些属性完成表格基础功能 */}
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        //边框
                        bordered
                        // 列表是否可选
                        //里面的key值 type 可以定义单选还是多选
                        //checkbox or radio
                        rowSelection={rowCheckSelection}
                        //可以接受一个 回调函数
                        //可以得到当前这一行的数据
                        columns={columns}
                        dataSource={dataSource2}
                        //分页
                        
                    />
                </Card>
                <Card title='Mock-表格分页' style={{margin:'10px 0px'}}>
                    {/* 自闭和方式，通过一些属性完成表格基础功能 */}
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={dataSource2}
                        //分页
                        pagination={this.state.pagination}
                    />
                </Card>
                <Card title='Mock-表格分页' style={{margin:'10px 0px'}}>
                    {/* 自闭和方式，通过一些属性完成表格基础功能 */}
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table 
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={dataSource2}
                        //分页
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}

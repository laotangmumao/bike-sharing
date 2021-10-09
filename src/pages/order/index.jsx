import React, { Component } from 'react'
import {Card , Button , Table , Form , Select , Modal, message, DatePicker} from 'antd'
import ETable from '../../components/ETable';
import Axios from './../../axios/index';
import BaseForm from '../../components/BaseForm';
import Utils from '../../Utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends Component {
    state={
        orderInfo:{}, 
        orderConfirmVisble:false
    }
    params = {
        page:1
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            //初始化
            initialValue :'1',
            width:100,
            //每一项的值
            list:[
                {id:'0',name:'全部'},
                {id:'1',name:'北京'},
                {id:'2',name:'天津'},
                {id:'3',name:'上海'}
            ]
        },
        {
            type:'时间查询',
            
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            //初始化
            initialValue : '1',
            width:100,
            //每一项的值
            list:[
                {id:'0',name:'全部'},
                {id:'1',name:'进行中'},
                {id:'2',name:'进行中（临时锁车）'},
                {id:'3',name:'结束行程'},
            ]
        }
    ]
    componentDidMount(){
        this.requestList()
    }

    handelFielter = (params) => {
        this.params = params;
        this.requestList();
    }

    requestList = () => {
        let _this = this
        Axios.requesList(this,'/order/list',this.params,true)
        
    }
    //结束订单确认
    handleConfim = () => {
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title:'信息',
                content:"请选择一条订单进行结束"
            })
            return;
        }
        Axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then(res=>{
            if(res.code == 0){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble:true
                })
            }
        })
        
    }
    //结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem
        Axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then(res=>{
            if(res.code == 0){
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble:false
                })
                this.requestList()
            }
        })
    }
    //打开订单详情
    openOrderDetail = () => {
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title:'信息',
                content:"请先选择一条订单"
            })
            return;
        }
        console.log(item)
        //打开新窗口
        window.open(`/#/common/order/detail/${item.user_id}`,'_blank')
        
    }
    render() {
        const columns = [
            {
                title:'订单编号',
                align:'center',
                dataIndex:'order_sn',
            },
            {
                title:'车辆编号',
                align:'center',
                dataIndex:'bike_sn',
            },
            {
                title:'用户名',
                align:'center',
                dataIndex:'user_name',
            },
            {
                title:'手机号码',
                align:'center',
                dataIndex:'mobile',
            },
            {
                title:'里程',
                align:'center',
                dataIndex:'distance',
                render(distance){
                    return distance/1000+'Km'
                }
            },
            {
                title:'行使时长',
                align:'center',
                dataIndex:'total_time',
            },
            {
                title:'状态',
                align:'center',
                width:'160px',
                dataIndex:'status',
                render(status){
                    switch(status){
                        case 1:
                            return '进行中';
                        case 2:
                            return '进行中（临时锁车）';
                        case 3:
                            return '结束行程';
                        default:
                            return '全部'
                    }
                }
            },
            {
                title:'开始时间',
                align:'center',
                dataIndex:'start_time',
            },
            {
                title:'结束时间',
                align:'center',
                dataIndex:'end_time',
            },
            {
                title:'订单金额',
                align:'center',
                dataIndex:'total_fee',
            },
            {
                title:'实付金额',
                align:'center',
                dataIndex:'user_pay',
            },
        ]
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} fieldSubmit={this.handelFielter} />
                </Card> 
                <Card style={{marginTop:10}}>
                    <Button type='primary' style={{marginRight:10}} onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' onClick={this.handleConfim}>结束订单</Button>
                </Card>
                <div className='content-wrap'>
                    <ETable 
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource = {this.state.list}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedIds = {this.state.selectedIds}
                        selectedItem = {this.state.selectedItem}
                        pagination = {this.state.pagination}
                        // rowSelection = 'checkbox'
                        
                    />
                </div>
                <Modal 
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form>
                        <FormItem {...formItemLayout} label='车辆编号'>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem {...formItemLayout} label='剩余电量'>
                            {this.state.orderInfo.battery+'%'}
                        </FormItem>
                        <FormItem {...formItemLayout} label='行程开始时间'>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem {...formItemLayout} label='当前位置'>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
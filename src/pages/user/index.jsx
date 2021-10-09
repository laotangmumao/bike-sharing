import React, { Component } from 'react'
import {Card , Button ,Radio, Table , Form , Select , Modal, message, DatePicker,Input} from 'antd'
import Axios from './../../axios/index';
import Utils from '../../Utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from './../../components/ETable/index'
import moment from 'moment'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
export default class User extends React.Component{
    
    params = {
        page:1
    }
    
    state ={
        isVisible:false
    }

    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名称',
            width:100,
        },
        {
            type:'INPUT',
            label:'用户手机号',
            field:'user_mobile',
            placeholder:'请输入用户手机号',
            width:100,
        },
        {
            type:'DATE',
            label:'请选择入职日期',
            field:'user_date',
            placeholder:'请选择日期',
        },
    ]

    componentDidMount(){
        this.requestList()
    }

    handelFielter = (params) => {
        this.params = params;
        this.requestList()
    }

    requestList = () => {
        Axios.requesList(this,'/user/list',this.params)
    }

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem
        if(type == 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工',
                userInfo:''
            })
        }else if(type == 'edit'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content: '请选择一个用户'
                })
                return
            }
            
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            })
            
        }else if(type == 'detail'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content: '请选择一个用户'
                })
                return
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            })
        }else{
            if(!item){
                Modal.info({
                    title:'提示',
                    content: '请选择一个用户'
                })
                return
            }
            let _this= this
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的员工',
                onOk(){
                    
                    Axios.ajax({
                        url:'/user/list',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        message.success('员工删除成功')
                        if(res.code == 0 ){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList()
                        }
                    })
                }
            })
        }
    }

    //创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        console.log(this.userForm);
        let data = this.userForm.props.form.getFieldsValue();
        Axios.ajax({
            url:"create"?'/user/add':'/user/edit',
            data:{
                params:data
            }
        }).then(res=>{
            if(res.code == 0){
                this.userForm.props.form.resetFields()
                this.setState({
                    isVisible:false
                })
            }
            this.requestList()
        })
        
    }

    render(){
        
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
        let footer = {};
        if(this.state.type == 'detail'){
            footer.footer=null
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} fieldSubmit={this.handelFielter}/>
                </Card>
                <Card style={{marginTop:10}} className='operate-wrap'>
                    <Button type='primary' icon='plus' onClick={()=>this.handleOperate('create')}>添加员工</Button>
                    <Button type='primary' icon='edit' onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type='primary' onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type='primary' icon='delete' onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className='content-wrap'>
                    <ETable 
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource = {this.state.list}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        pagination = {this.state.pagination}
                        // rowSelection = 'checkbox'
                        
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible = {this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields()
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600} 
                    { ...footer }
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(init)=>{this.userForm=init}} ></UserForm>
                </Modal>
            </div>
        )
    }    
}
class UserForm extends Component {
    getState = (state) => {
        return {
                1:'努力努力在努力',
                2:'奋斗奋斗奋斗奋斗',
                3:'坚强坚强坚强坚强坚',
                4:'阿里FE',
                5:'创业者',
        }[state]
    }
    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            lablecol:{span:5},
            wrapperCol:{span:19}
        }
        return (
            <Form layout='horizontal'>
                <FormItem 
                    label='用户名' 
                    {...formItemLayout} 
                >
                    {   type == 'detail'?userInfo.userName:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.userName
                        })(
                            <Input type='text' placeholder='请输入用户名' />
                        )
                    }
                </FormItem>
                <FormItem 
                    label='性别' 
                    {...formItemLayout} 
                >
                    {
                        type == 'detail'?userInfo.sex==1?'男':'女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='当前状态' {...formItemLayout}>
                    {
                        type == 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            //初始化值
                            initialValue:userInfo.state
                        })(
                            <Select>
                                <Option value={1}>努力努力在努力</Option>
                                <Option value={2}>奋斗奋斗奋斗奋斗</Option>
                                <Option value={3}>坚强坚强坚强坚强坚</Option>
                                <Option value={4}>阿里FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )               
                    }
                </FormItem>
                <FormItem 
                    label='生日' 
                    {...formItemLayout} 
                >
                    {
                        type == 'detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem 
                    label='联系地址' 
                    {...formItemLayout} 
                >
                    {
                        type == 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={3} placeholder='请输入联系地址' />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)
import React , {Component} from 'react'
import {Card , Button , Table , Form , Select , Modal, message} from 'antd'
import axios from './../../axios/index'
import Utils from './../../Utils/utils'
import './../../style/common.less'
const Option = Select.Option
const FormItem = Form.Item
export default class City extends Component {
    state={
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.requestList()
    }
    
    //默认请求我们的接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url:'/open/city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(res=>{
            this.setState({
                list:res.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                }),
                pagination:Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList()
                })
            })
        })
    }

    //开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }
    //城市开通提交
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url:'/city/open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code == '0'){
                message.success('开通成功');
                this.setState({
                    isShowOpenCity:false
                })
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title:'城市ID',
                align:'center',
                dataIndex:'id',
            },
            {
                title:'城市名称',
                align:'center',
                dataIndex:'name'
            },
            {
                title:'用车模式',
                align:'center',
                dataIndex:'mode',
                render(mode){
                    if(mode == 1){
                        return "指定停车点"
                    }else{
                        return '禁停区'
                    }
                }
            },
            {
                title:'运营模式',
                align:'center',
                dataIndex:'op_mode',
                render(op_mode){
                    if(op_mode == 1){
                        return "自营"
                    }else{
                        return '加盟'
                    }
                }
            },
            {
                title:'授权加盟商',
                align:'center',
                dataIndex:'franchisee_name'
            },
            {
                title:'城市管理员',
                align:'center',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name
                    }).join(',');
                }
            },
            {
                title:'城市开通时间',
                align:'center',
                dataIndex:'open_time'
            },
            {
                title:'操作时间',
                align:'center',
                dataIndex:'update_time',
                render(time){
                    return Utils.formateDate(time)
                }
            },
            {
                title:'操作人',
                align:'center',
                dataIndex:'sys_user_name'
            },
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        bordered 
                        columns={columns}
                        dataSource={this.state.list}
                        // pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    {/* wrappedComponentRef 和 ref 道理差不多 */}
                    <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}} />
                </Modal>
            </div>
        )
    }
}
class FilterForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout='inline'>
                <FormItem label='城市'>
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width:'100px',marginLeft:'20px'}}
                                placeholder='全部'
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='用车模式'>
                    {
                        getFieldDecorator('mode')(
                            <Select
                                placeholder='全部'
                                style={{width:'130px',marginLeft:'20px'}}
                            >
                                <Option value=''>全部</Option>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='营运模式'>
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                            style={{width:'100px',marginLeft:'20px'}}
                                placeholder='全部'
                            >
                                <Option value=''>全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='加盟商授权状态'>
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                placeholder='全部'
                                style={{width:'100px',marginLeft:'20px'}}
                            >
                                <Option value=''>全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label=''>
                    <Button type='primary' style={{margin:'0 20px 0 40px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm)
class OpenCityForm extends Component {
    render(){
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const {getFieldDecorator} = this.props.form
        return (
            
            <Form layout='horizontal'>
                <FormItem label='选择城市' {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select style={{width:100}}>
                                <Option value=''>全部</Option>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                                <Option value='3'>深圳市</Option>
                            </Select>
                        )
                    }
                    
                </FormItem>
                <FormItem label='营模模式' {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode',{
                            initialValue:'1'
                        })(
                            <Select style={{width:100}}>
                                <Option value='1'>自营</Option>
                                <Option value='2'>加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='用车模式' {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode',{
                            initialValue:'1'
                        })(
                            <Select style={{width:100}}>
                                <Option value='1'>指定停车点</Option>
                                <Option value='2'>禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm)

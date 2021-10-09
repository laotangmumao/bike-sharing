import {Card , Form , Input , Radio , Select , InputNumber , Switch  , Icon , Upload ,Checkbox  , Button, message , DatePicker , TimePicker} from 'antd'
import React, { Component } from 'react'
import moment from 'moment'
const FormItem = Form.Item;
const RadioGrop = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;
class FormRegister extends Component {
    state={}
    handleSubmit = () =>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName}恭喜你，通过本次表单学习，密码为${userInfo.userPwd}`)
            }
        })
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    render() {
        //form 是个对象 里面有很多定义 ， 所以要用解构的方式获取
        const {getFieldDecorator} = this.props.form;
        //labelCol 是指定 label标签布局
        //wrapperCol 是指定输入控件设置布局样式
        //这里 wrapperCol 是 input
        //也可以直接写到标签的属性里，因为我们要复用 所以这样比较省事
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:10
            }
        }
        //最小行最大行
        const rowObject = {
            minRows:2,
            maxRows:3
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return (
            <div>
                <Card title='注册表单'>
                    {/*layout = ''horizontal'是设置水平表单布局的意思*/}
                    <Form layout='horizontal'>
                        {/*FormItem 指定每一项 可以添加属性 label=‘文本框前显示的文本’ */}
                        <FormItem label='用户名' {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        
                                    ]
                                })(<Input prefix={<Icon type='user' />} />)
                            }
                        </FormItem>
                        <FormItem label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        
                                    ]
                                })(<Input prefix={<Icon type='lock' />} type='password'/>)
                            }
                        </FormItem>
                        <FormItem label='性别' {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    //初始化值
                                    initialValue:'1'
                                })(
                                    <RadioGrop>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </RadioGrop>
                                )               
                            }
                        </FormItem>
                        <FormItem label='年龄' {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    //初始化值
                                    initialValue:'18'
                                })(
                                    <InputNumber/>
                                )               
                            }
                        </FormItem>
                        <FormItem label='当前状态' {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    //初始化值
                                    initialValue:'4'
                                })(
                                    <Select>
                                        <Option value='1'>努力努力在努力</Option>
                                        <Option value='2'>奋斗奋斗奋斗奋斗</Option>
                                        <Option value='3'>坚强坚强坚强坚强坚</Option>
                                        <Option value='4'>阿里FE</Option>
                                        <Option value='5'>创业者</Option>
                                    </Select>
                                )               
                            }
                        </FormItem>
                        <FormItem label='爱好' {...formItemLayout}>
                            {
                                getFieldDecorator('interest',{
                                    //初始化值
                                    initialValue:['1','2','5']
                                })(
                                    <Select mode='multiple'>
                                        <Option value='1'>敲代码</Option>
                                        <Option value='2'>学习</Option>
                                        <Option value='3'>读书</Option>
                                        <Option value='4'>旅游</Option>
                                        <Option value='5'>音乐</Option>
                                        <Option value='6'>运动</Option>
                                        <Option value='7'>天文</Option>
                                        <Option value='8'>科学</Option>
                                        <Option value='9'>爬山</Option>
                                        <Option value='10'>骑行</Option>
                                    </Select>
                                )               
                            }
                        </FormItem>
                        <FormItem label='是否已婚' {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried',{
                                    //初始化值
                                    initialValue: true,
                                    valuePropName:'checked'
                                })(
                                    <Switch/>
                                )               
                            }
                        </FormItem>
                        <FormItem label='生日' {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    //初始化值
                                    initialValue:moment('2018-08-08')
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )               
                            }
                        </FormItem>
                        <FormItem label='联系地址' {...formItemLayout}>
                            {
                                getFieldDecorator('address',{
                                    //初始化值
                                    initialValue:'河北省-唐山市-滦南县-天承锦绣'
                                })(
                                    <TextArea
                                        //autosize自适应内容高度
                                        //可设置为 true/false
                                        //或对象{minRows:2,maxRows:6}
                                        autosize={
                                            rowObject
                                        }
                                         
                                    />
                                )               
                            }
                        </FormItem>
                        <FormItem label='早起时间' {...formItemLayout}>
                            {
                                getFieldDecorator('time',{
                                    initialValue:moment('09-08-08')
                                })(
                                    <TimePicker
                                       
                                    />
                                )               
                            }
                        </FormItem>
                        <FormItem label='头像' {...formItemLayout}>
                            {
                                getFieldDecorator('userImg',)(
                                    <Upload
                                        action='//jsonplaceholder.typicode.com/posts/'
                                        showUploadList={true }
                                        listType='picture-card'
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg?<img src={this.state.userImg}/>: <Icon type='plus' />}
                                    </Upload>
                                )               
                            }
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            {
                                getFieldDecorator('userImg',)(
                                    <Checkbox>
                                        我已阅读过<a href='#'>用户协议</a>
                                    </Checkbox>
                                )               
                            }
                        </FormItem>
                        <FormItem  {...offsetLayout}>
                            {
                                getFieldDecorator('userImg',{
                                    
                                })(
                                    <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                                )               
                            }
                        </FormItem>
                        
                    </Form>
                </Card>
            </div>
        )
    }
}
//创建一个新表单 同时把现在这个表单传递进去
export default Form.create()(FormRegister)

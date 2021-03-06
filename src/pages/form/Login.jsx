import React, { Component } from 'react'
import {Card , Form , Input , Icon , Checkbox  , Button, message} from 'antd'
const FormItem = Form.Item
class FormLogin extends Component {
    handleSubmit=()=>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName}恭喜你，通过本次表单学习，密码为${userInfo.userPwd}`)
            }
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Card title='行内登陆表单'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码' />
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='水平登陆表单'>
                    <Form layout='horizontal' style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:5,max:10,
                                            message:'长度不在范围内'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为英文字母或者数字'
                                        }
                                    ] 
                                })(<Input prefix={<Icon type='user' />} placeholder='请输入用户名' />)
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户密码不能为空'
                                        }
                                    ]
                                })(<Input prefix={<Icon type='lock' />} type='password' placeholder='请输入密码' />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    initialValue:true,
                                    valuePropName:'checked'
                                    
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href='#' style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}>登陆</Button>
                        </FormItem>
                        
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin)
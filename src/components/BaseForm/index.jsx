import React from 'react';
import {Input , Select , Form , Button, Checkbox, Radio, DatePicker} from 'antd';
import utils from '../../Utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.fieldSubmit(fieldsValue)
    }
    
    reset = () => {
        this.props.form.resetFields()
    }

    initFormList = () =>{
        //帮助实现双向数据绑定
        const {getFieldDecorator} = this.props.form;
        //协助获取从外层传递的 Formlist
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder
                let width = item.width
                
                if(item.type == '城市'){
                    const city = <FormItem label='城市' key={field}>
                    {
                        getFieldDecorator([field],{
                            initialValue:'0'
                        })(
                            <Select
                                style={{width}}
                                placeholder={placeholder}
                            >
                                { utils.getOptionList(item.list) }
                            </Select>
                        )
                    }
                </FormItem>;
                formItemList.push(city);
                    { utils.getOptionList()}
                }else if(item.type == '时间查询'){
                    const begin_time = <FormItem label='订单时间' key={field}>
                        {
                            getFieldDecorator('begin_time',{
                                initialValue:initialValue
                            })(
                                <DatePicker showTime={true}  placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss'  />
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time);
                    const end_time = <FormItem colon={false}  label='~' key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true}  placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss'  />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time);

                }
                if(item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue:initialValue
                            })(
                                <Input type='text' placeholder={placeholder}  />
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                }else if(item.type == 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue:initialValue
                            })(
                                <Select
                                    style={{width}}
                                    placeholder={placeholder}
                                >
                                    { utils.getOptionList(item.list) }
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                }else if(item.type == 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName:'checked',
                                initialValue:initialValue //true | false
                            })(
                                <Checkbox>
                                    {lable}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                }
                else if(item.type == 'DATE'){
                    const Date = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <DatePicker showTime={true}  placeholder={placeholder} format='YYYY-MM-DD HH:mm:ss'  />
                            )
                        }
                    </FormItem>;
                    formItemList.push(Date);
                }
                
            })
        }
        return formItemList;
    }
    render(){
        return (
            <Form layout='inline'>
                {this.initFormList()}
                <FormItem>
                    <Button type='primary' style={{margin:'0 20px 0 40px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset} >重置</Button>
                </FormItem>
            </Form>
            
        )
    }
}
export default Form.create({})(FilterForm);
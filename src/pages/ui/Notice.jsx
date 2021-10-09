import {Card,Button, notification} from 'antd'
import './ui.less'
import React, { Component } from 'react'

export default class Notice extends Component {
    openNotification = (type,direction) => {
        if(direction){
            notification[type]({
                placement:direction,
                message:'就业薪资18000',
                description:'明天的你会感谢今天努力的自己' 
            })
        }else{
            notification[type]({
                placement:'topRight',
                message:'就业薪资18000',
                description:'明天的你会感谢今天努力的自己' 
            });
        }
        
    }
    render() {
        return (
            <div>
                <Card title='通知提醒框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type='primary' onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>
                <Card title='通知提醒框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.openNotification('success','topLeft')}>Success</Button>
                    <Button type='primary' onClick={()=>this.openNotification('info','topRight')}>Info</Button>
                    <Button type='primary' onClick={()=>this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type='primary' onClick={()=>this.openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}

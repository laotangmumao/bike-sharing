import {Card,Button,Modal} from 'antd'
import './ui.less'
import React, { Component } from 'react'

export default class Modals extends Component {
    
    state={
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    }

    handleOpen = (type) => {
        this.setState({
            [type]:true
        })
    }
    handleConfirm = (type) => {
        Modal[type]({
            title :'确认?',
            content:'你确定你没学会？',
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancel')
            }
        })
    }
    render() {
        let {showModal1 , showModal2 , showModal3 , showModal4} = this.state
        return (
            <div>
                <Card title='基础模态框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal1")}>Open</Button>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal2")}>自定义页脚</Button>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal3")}>顶部20px弹框</Button>
                    <Button type='primary' onClick={()=>this.handleOpen("showModal4")}>水平垂直居中</Button>
                </Card>
                <Card title='信息确认框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleConfirm("confirm")}>Confirm</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("info")}>Info</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("success")}>Success</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm("warning")}>Warning</Button>
                </Card>
                <Modal 
                    title='React'
                    visible={showModal1}
                    onCancel={()=>{this.setState({showModal1:false})}}
                >
                    <p>明天的你会感谢今天努力的自己</p>
                </Modal>
                

                <Modal 
                    title='React'
                    visible={showModal2}
                    onCancel={()=>{this.setState({showModal2:false})}}
                    okText='好的'
                    cancelText='算了'
                >
                    <p>不要假装努力，结果不会陪你演戏</p>
                </Modal>


                <Modal 
                    title='React'
                    style={{top:20}}
                    visible={showModal3}
                    onCancel={()=>{this.setState({showModal3:false})}}
                >
                    <p>测试哈哈哈，嘻嘻</p>
                </Modal>


                <Modal 
                    title='React'
                    wrapClassName='vertical-center-modal'
                    visible={showModal4}
                    onCancel={()=>{this.setState({showModal4:false})}}
                >
                    <p>自律 用心，勿忘初心</p>
                </Modal>
            </div>
        )
    }
}

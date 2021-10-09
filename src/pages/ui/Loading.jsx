import React, { Component } from 'react'
import {Card,Button,Spin,Icon,Alert} from 'antd'
import './ui.less'
export default class Loading extends Component {
    render() {
        const icon = <Icon type='plus' style={{fontSize:30}} />
        const iconLoading = <Icon type='loading' style={{fontSize:30}} />
        return (
            <div>
                <Card title='Spin 用法' className='card-wrap'>
                    <Spin size='small'/>
                    <Spin size='default' style={{margin:'0 20px'}} />
                    <Spin size='large' />     
                    <Spin indicator={icon} spinning={true} style={{marginLeft:20}} />               
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                    <Alert 
                        message="React"
                        description="欢迎来到对抗路"
                        type='info'
                    />
                    
                    <Spin>
                        <Alert
                            style={{ margin: "10px 0" }}
                            message="React"
                            description="欢迎来到对抗路"
                            type='warning'
                        />
                    </Spin>

                    <Spin tip='加载中...'>
                        <Alert
                            style={{ margin: "10px 0" }}
                            message="React"
                            description="欢迎来到对抗路"
                            type='warning'
                        />
                    </Spin>

                    <Spin indicator={iconLoading}>
                        <Alert
                            style={{ margin: "10px 0" }}
                            message="React"
                            description="欢迎来到对抗路"
                            type='warning'
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}

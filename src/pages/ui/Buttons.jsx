import React, { Component } from 'react'
import {Card,Button,Radio} from 'antd'
import './ui.less'
export default class Buttons extends Component {
    state={
        loading:true,
        size:'default'
    }
    handleCloseLoading = () => {
        this.setState({
            loading:false
        })
    }
    handleOpenLoading = () => {
        this.setState({
            loading:true
        })
    }
    handleSizeChange = (e) => {
        this.setState({
            size:e.target.value
        })
    }
    render() {
        let {loading,size} = this.state
        return (
            <div className='button'>
                <Card className='card-wrap' title='基础按钮'>
                    <Button type='primary'>主按钮</Button>
                    <Button type=''>普通按钮</Button>
                    <Button type='dashed'>虚线按钮</Button>
                    <Button type='danger'>删除按钮</Button>
                    <Button disabled>禁用按钮</Button>
                </Card>
                <Card className='card-wrap' title='图形按钮'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button shape='circle' icon='search'></Button>
                    <Button icon='search' type='primary'>搜索</Button>
                    <Button icon='download' type='primary'>下载</Button>
                </Card>
                <Card className='card-wrap' title='图形按钮'>
                    <Button type='primary' loading={loading} onClick={this.handleOpenLoading}>确定</Button>
                    <Button type='primary' shape='circle' loading={loading}></Button>
                    <Button loading={loading}>点击加载</Button>
                    <Button shape='circle'loading={loading}></Button>
                    <Button  type='primary' onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card className='Card' title='按钮组'>
                    <Button.Group >
                        <Button type='primary' icon='left'>返回</Button>
                        <Button type='primary' icon='right'>前进</Button>
                    </Button.Group>
                </Card>
                <Card className='card-wrap' title='按钮尺寸'>
                    <Radio.Group onChange={this.handleSizeChange}>
                        <Radio value='small'>小</Radio>
                        <Radio value='default'>中</Radio>
                        <Radio value='large'>大</Radio>
                    </Radio.Group>
                    <Button type='primary' size={size}>主按钮</Button>
                    <Button type='dashed' size={size}>虚线按钮</Button>
                    <Button type='danger' size={size}>删除按钮</Button>
                    <Button disabled size={size}>禁用按钮</Button>
                </Card>
            </div>
        )
    }
}

//项目主结构代码
import React, { Component } from 'react'
import {Row,Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer/indexx'
import './style/common.less'
export default class Common extends Component {

    render() {
        return (
            <div>
                <Row className='simple-page'>
                    <Header menuType = 'second' />
                </Row>
                <Row className='content'>
                    {this.props.children}
                </Row>
                
               
            </div>
        )
    }
}

//项目主结构代码
import React, { Component } from 'react'
import {Row,Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer/indexx'
import NavLeft from './components/NavLeft'
import './style/common.less'
import Home from './pages/home'
export default class Admin extends Component {
    render() {
        return (
            <div>
                <Row className='container'>
                    <Col span={4} className='nav-left'>
                        <NavLeft/>
                    </Col>
                    <Col span={20} className='main'>
                        <Header />
                        <Row className='content'>
                           {this.props.children} 
                        </Row>
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}

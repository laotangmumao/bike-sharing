import React, { Component } from 'react'
import {Row,Col} from 'antd'
import './index.less'
import axios from 'axios'
import util from '../../Utils/utils'
import { connect } from 'react-redux'
class Header extends Component {
    state={
    }
    componentWillMount(){
        this.setState({
            userName:'老汤姆猫'
        })
        setInterval(() => {
            let sysTime = util.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherAPIData()
    }
    getWeatherAPIData(){
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101091101&key=74599e45e4ba43829c8d857edabdcf44")
        .then(res=>{
            if(res.data.code==="200"){
                let data = res.data.now
                this.setState({
                    // dayPictureUrl:data.icon,//图标
                    dayPictureUrl:`/assets/TianQibw-64/${data.icon}.png`,//图标
                    weather:data.text,//天气
                })
            }
        })
        .catch()
    }
    render() {
        const {menuName,menuType} = this.props
        let {userName , sysTime , dayPictureUrl , weather} = this.state;
        return (
            <div className='header'>
                <Row className='header-top'>
                {
                    menuType ? <Col span={6} className='logo'>
                        <img src="/assets/logo-ant.svg" alt="" />
                        <span>IMooc 通用管理系统</span>
                    </Col>:""
                }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{userName}</span>
                        <a>退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className='breadcrumb'>
                        <Col span={4} className='breadcrumb-title'>
                            {menuName}
                        </Col>
                        <Col span={20} className='weather'>
                            <span className='date'>{sysTime}</span>
                            <span className='weather-detail'>
                                <img src={dayPictureUrl} alt='' />
                            </span>
                            <span>{weather}</span>

                        </Col>
                    </Row>
                }
                
            </div>
        )
    }
}
const mapStateToProps =(state,ownProps)=>{
    

    return {
        menuName:state.menuName
    }
}
export default connect(mapStateToProps)(Header)
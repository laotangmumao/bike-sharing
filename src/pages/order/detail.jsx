import React, { Component } from 'react'
import {Card ,} from 'antd'
import Axios from './../../axios/index';
import './detail.less'
export default class OrderDetail extends Component {

    state={}
    componentDidMount(){
        let orderId = this.props.match.params.orderId
        console.log(orderId);
        if(orderId){
            this.getDetailInfo(orderId)
        }
        
    }
    getDetailInfo = (orderId)=>{
        Axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then(res=>{
            console.log(res);
            if(res.code == "0"){
                this.setState({
                    orderInfo:res.result
                })
                this.renderMap(res.result)
                // console.log(orderInfo);
            }else{
                throw new Error(res.msg)
            }
        })
    }
    renderMap(result){
        this.map = new window.BMapGL.Map('orderDetailMap')
        
        // 添加地图空间
        this.addMapControl()
        //调用路线图绘制方法
        this.drawBikeRoute(result.position_list)
        //调用服务区绘制方法
        this.drwaServiceArea(result.area)
    }
    //  添加地图控件
    addMapControl(){
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
        map.addControl(new window.BMapGL.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
    }
    //绘制用户的形式路线
    drawBikeRoute(positionList){
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if(positionList.length>0){
            
            let first = positionList[0]
            let last = positionList[positionList.length-1]
            //起始坐标点
            startPoint = new window.BMapGL.Point(first.lon,first.lat)
            // 创建一个起始坐标点的坐标 Icon图标
            // 空间和图片的大小
            let startIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            })
            let startMarker = new window.BMapGL.Marker(startPoint,{icon:startIcon});
            this.map.addOverlay(startMarker)

            endPoint = new window.BMapGL.Point(last.lon,last.lat)
            // 创建一个起始坐标点的坐标 Icon图标
            // 空间和图片的大小
            let endIcon = new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
                imageSize:new window.BMapGL.Size(36,42),
                anchor:new window.BMapGL.Size(36,42)
            })
            let endMarker = new window.BMapGL.Marker(endPoint,{icon:endIcon});
            this.map.addOverlay(endMarker)
            
            //连接路线图
            let trackPoint = [];
            for (let i = 0 ; i < positionList.length; i++){
                let point = positionList[i]
                trackPoint.push(new window.BMapGL.Point(point.lon,point.lat));
            }
            let polyline = new window.BMapGL.Polyline(trackPoint,{
                strokeColor:'#1869AD',
                strokWieght:3,
                strokOpacity:1
            })
            this.map.addOverlay(polyline)
            
            
            
            
            
            this.map.centerAndZoom(endPoint,11) 
        }
        //绘制服务区
        
    }
    drwaServiceArea = (positionList) => {
        //连接路线图
        let trackPoint = [];
        for (let i = 0 ; i < positionList.length; i++){
            let point = positionList[i]
            trackPoint.push(new window.BMapGL.Point(point.lon,point.lat));
        }
        let polyGon = new window.BMapGL.Polygon(trackPoint,{
            strokeColor:'#ce0000',
            strokWieght:4,
            //透明度
            strokOpacity:1,
            //填充颜色
            fillColor:'#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polyGon)
    }
    render(){
        const info = this.state.orderInfo || {}
        console.log(info);
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className='order-map'>

                    </div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ?'服务区':"停车点"}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="detail-items">
                        <div className="item-title">行车轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>               
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}Km</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
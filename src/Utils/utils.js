import React from 'react'
import {Select} from 'antd'
const Option = Select.Option
export default {
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        let year = date.getFullYear()
        let month = date.getMonth()-0+1;
        let day = date.getDate()<10?'0'+date.getDate():date.getDate();
        let hours = date.getHours()<10?'0'+date.getHours():date.getHours();
        let minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
        let seconds = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
        let myDate = year+'年'+month+'月'+day+'日 '+' '+hours+':'+minutes+':'+seconds;
        return myDate;
    },
    //分页
    pagination(data,callback){
        return {
            
            onChange:(current)=>{
                callback(current)
            },
            //当前页数 number
            current:data.result.page,
            //每页条数
            pageSize:data.result.page_size,
            //总页数
            total:data.result.total,
            //用于显示数据总量和当前数据顺序
            showTotal:() => {
                return `共${data.result.total}条`
            },
            // 是否可以快速跳转至某页面
            showQuickJumper:true,
            //默认的当前页数
            // defaultCurrent,
            //默认的每页条数
            // defaultPageSize,
            //只有一页时是否隐藏分页器
            // hideOnSinglePage,
        }
        
    },
    getOptionList(data){
        if(!data)return [];
        let options = []
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
        
    }
}
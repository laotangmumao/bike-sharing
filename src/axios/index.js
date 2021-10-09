import axios from 'axios';
import {Modal} from 'antd';
// import { options } from 'less';
import Utils from './../Utils/utils'
import { options } from 'less';
export default class Axios {
    static requesList(_this,url,params,isMock){
        var data = {
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index
                    return item
                })
                
                _this.setState({
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        })
    }
    static ajax(option){
        let loading;
        if(option.data && option.data.isShowLoading !== false){
            loading=document.getElementById('ajaxLoading')
            loading.style.display='block'
        }
        let baseApi = ''
        if(options.isMock){
            baseApi = 'https://www.fastmock.site/mock/e22fc9df63a255c486f833888e4c9121/_tom_api'
        }else{
            baseApi = 'https://www.fastmock.site/mock/e22fc9df63a255c486f833888e4c9121/_tom_api'
        }
        
        return new Promise((resolve,reject)=>{
            axios({
                url:option.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(option.data && option.data.params) || '',

            }).then(response=>{
                if(option.data && option.data.isShowLoading !== false){
                    loading=document.getElementById('ajaxLoading')
                    loading.style.display='none'
                }
                if(response.status=='200'){
                    let res = response.data
                    if(res.code == 0){
                        // debugger
                        resolve(res)
                    }else{
                         
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}
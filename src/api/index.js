import axios from 'axios'
import {Message} from 'element-ui'

const err = (error) =>{
    if(error.response){
        if (err.response.status == 504 || err.response.status == 404) {
            Message.error({message: '服务器没有应答'});
          } else if (err.response.status == 403) {
            Message.error({message: '权限不足,请联系管理员!'});
          } else if (err.response.status == 401) {
            Message.error({message: err.response.data.msg});
          } else {
            if (err.response.data.msg) {
              Message.error({message: err.response.data.msg});
            }else{
              Message.error({message: '未知错误!'});
            }
          }
    }
}
//axios拦截器
axios.interceptors.request.use(config=>{
    return config;
},err=>{
    Message.err({message:'请求超时！'});
})

axios.interceptors.response.use(data => {
    if(data.status && data.status == 200 && data.data.status == 500){
        Message.error({message: data.data.msg});
    }
    if (data.data.msg) {
        Message.success({message: data.data.msg});
      }
      return data;
},err) 
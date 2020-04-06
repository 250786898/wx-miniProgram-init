
import config from '../config/index'
const Fly = require('./flyio/index')
const fly = new Fly

//定义请求的基本路径
fly.config.baseURL = config.BASE_URL

//请求拦截器
fly.interceptors.request.use(request => {
  //拦截处理
  request.headers = {
    // appkey: config.appkey,
    "Content-Type": "application/x-www-form-urlencoded",
  }
  request.dataType = "text"
  request.parseJson = false
  return request
})

//响应拦截
fly.interceptors.response.use(response => {
  //拦截处理操作
  return response
})


export const api = {
  //返回结果的状态码
  CODE: {
    SUCCESS: 200000, //调用成功
    OPTIONS_ERROR: 5000100 //参数错误
  },

  get: (params) => {
    return fly.get(params.url, params.data)
  },

  post: (params) => {
    return fly.post(params.url, params.data, params.options)
  }
}

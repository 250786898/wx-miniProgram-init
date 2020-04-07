import Fly from '../../utils/flyio/index'
import config from '../../config/index'
import RequestCode from './requestCode'
const fly = new Fly()

class RequestModel{
  constructor () {
    this.initFlySetting()
  }

  /**
   * @description 初始化Flyio配置，全局的拦截处理
   */
  initFlySetting () {
      //定义请求的基本路径
      fly.config.baseURL = config.BASE_URL

      //请求拦截器
      fly.interceptors.request.use(request => {
        //拦截处理
        request.headers = { //请求头
          "Content-Type": "application/x-www-form-urlencoded",
        }
        return request
      })

      //响应拦截
      fly.interceptors.response.use(response => {
        //拦截处理操作
        console.log('RequestCode',response)
        if(response.data.code == RequestCode.CODE.OPTIONS_ERROR) {
          //全局错误处理
        }
        return response.data
      })
  }

  /**
   * 
   * @param {object} params 封装的get请求： url:请求地址  data：请求数据
   */
  getRequest (params)  {
    return fly.get(params.url, params.data)
  }

  /**
   * 
   * @param {object} params 封装的post请求： url:请求地址  data：请求数据 options:请求额外参数
   */
  postRequest (params)  {
    return fly.post(params.url, params.data, params.options)
  }
  
}
export default RequestModel
//app.js
import { promiseWXApi } from './utils/index'
App({
  onLaunch: function () {
    this.setPromiseForWXApi()
  },

  
  globalData: {
    //全局数据管理
    wxp: {} //全局微信api-Promise化管理器
  },
  
  /**
   * @description 设置全局promise化微信小程序api
   */
  setPromiseForWXApi () {
    this.globalData.wxp = promiseWXApi()
  }
})
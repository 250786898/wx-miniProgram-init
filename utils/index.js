import { promisifyAll } from 'miniprogram-api-promise';

/**
 * @description promise化小程序api接口
 * @returns {object} promise化后api集合
 */
export function promiseWXApi() {
  const wxp = {}
  // promisify all wx's api
  promisifyAll(wx, wxp)
  return wxp
}

/**
 * @description 检查是否需要更新小程序
 */
export function checkUpdateApp() {
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        console.log('res.hasUpdate====')
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '发现新版本',
            content: '升级至新版本，享受最新最全的活动内容',
            showCancel: false,
            success: function (res) {
              // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            showCancel: false
          })
        })
      }
    })
  }
}
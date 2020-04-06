/**
 * @description 获取一个验证码随机数
 */
export const getRandomNumOfVerifyCode = () => {
  const randomNum = Math.random()
      .toString(36)
      .substr(2, 9)
  return randomNum 
} 


/**
 * @param {string} message 提示的信息
 * @param {boolean||string||number} isModal 填入则默认直接显示modal框
 * @description 成功提示，超过7个字显示modal框，少于则显示toast
 */
export const successRemind = (message,isModal = false) => {
  if (typeof message === 'string') {
    if (message.length > 7 || isModal) {
      wx.showModal({
        title:  '提示',
        content: message,
        image: '/images/common_ic_successful.png',
      })
    } else {
      wx.showToast({
        title: message,
        icon: 'success'
      })
    }
  } else {
    wx.showToast({
      title: message,
      icon: 'success'
    })
  }

}

/**
 * @param {string} message 提示的信息
 * @param {boolean||string||number} isModal 填入则默认直接显示modal框
 * @description 错误提示，超过7个字显示modal框，少于则显示toast
 */
export const errorRemind = (message, isModal) => {
  if (typeof message === 'string') {
    if (message.length > 7 || isModal) {
      wx.showModal({
        title:  '提示',
        content: message,
        image: '/images/error.png',
        showCancel: false
      })
    } else {
      wx.showToast({
        title: message,
        image: '/images/error.png'
      })
    }
  } else {
    wx.showToast({
      title: '操作失败',
      image: '/images/error.png'
    })
  }
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
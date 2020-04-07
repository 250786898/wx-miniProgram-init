
import UserModel from "../../models/user"
import RequestCode from "../../models/request/requestCode"
const user = new UserModel()
const { globalData } =  getApp()

Page({
  data: {
  },

  async onLoad  () {
    const res = await globalData.wxp.getSystemInfo()
    console.log('res',res)
    const userRes =await user.test()
    if(userRes.status == RequestCode.CODE.SUCCESS) {
      console.log('getSuccesss',userRes)
    }
    
  },

})

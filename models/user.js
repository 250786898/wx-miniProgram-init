import { api } from '../utils/http'

class UserModel{
  /**
   * @description 获取当前登录的用户信息
   */
  getUserInf (id) {
    return api.post({
      url: 'store/user/info',
      data:{
        id
      }
    })
  }

  /**
   * @description 获取员工管理列表
   */
  getStaffList(){
    return api.post({
      url:"store/user/list",
      data:{
        type: -1
      }
    })
  }

  /**
   * @description 添加新员工
   */
  addStaff(data){
    return api.post({
      url:"store/user/add",
      data
    })
  }

  /**
   * @description 删除员工
   */
  deleteStaff(id){
    return api.post({
      url:"store/user/delete",
      data:{
        id
      }
    })
  }

  /**
   * @description 退出登录
   */
  logout(){
    return api.post({
      url:"/store/user/logout",
    })
  }
}

export default UserModel
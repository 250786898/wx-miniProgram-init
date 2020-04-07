import RequestModel from './request/request'

class UserModel extends RequestModel {
  constructor () {
    super()
  }

  test () {
    return this.postRequest({
      url: 'index/getAdList.json'
    })
  }
}

export default UserModel
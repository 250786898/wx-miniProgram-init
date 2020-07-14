# wx-miniProgram-init
小程序项目初始化架构
好维护的项目需要一个好的架构开始，下面的架构是我根据七个微信小程序项目总结

![](https://user-gold-cdn.xitu.io/2020/4/6/1714e9acb191aaab?w=660&h=420&f=png&s=51159)

## 开发者新建项目
该架构未使用`云开发`，需要`云开发`额外勾选
![](https://user-gold-cdn.xitu.io/2020/4/6/1714ea407498086a?w=814&h=552&f=png&s=38109)

## 使用npm
从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 [`npm` ](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)安装第三方包。
首先我们需要初始化项目包，可以看到项目根目录生成了包配置文件`package.json`
```
npm init -y
```
### 使用vant-ui
使用ui框架可以帮助我们提高开发效率，重复造轮子。[`Vant-Weapp`](https://youzan.github.io/vant-weapp/#/quickstart)框架就是一个不错的选择。


* 步骤一 通过 npm 安装
```
# 通过 npm 安装
npm i @vant/weapp -S --production
```

* 步骤二 构建 npm 包
打开微信开发者工具，点击 工具 -> 构建 npm，并勾选 使用 `npm` 模块 选项，构建完成后，即可引入组件

## behaviors公用行为
`behaviors` 是用于组件间代码共享的特性，类似于`vue`中的“mixins”。每个 `behavior` 可以包含一组属性、数据、生命周期函数和方法。组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。 每个组件可以引用多个 `behavior` ，`behavior` 也可以引用其他 `behavior` 。

详细的参数含义和使用请参考 [`Behavior`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html) 参考文档。
在behaviors目录下新建testBehavior.js，一般我会根据模块创建`behavior`,像用户模块会新建userBehavior.js

```
<!--behaviors/testBehavior.js-->
export default Behavior({
  properties: {

  },
  data: {
    testData: {}
  },
  
  methods: {
    /**
     * @description 测试方法
     */
    testMethods () {

    }
  }
})
```
## components公用组件
### 全局公用组件components
该目录存放着项目中公共的组件，包括一些弹出层，加载组件等。组件以大驼峰命令，组件中可以再抽离各个小组件形成。

![](https://user-gold-cdn.xitu.io/2020/4/6/1714eb8c4027428e?w=263&h=156&f=png&s=8601)
### 页面的业务组件components
每个页面组件应该由不同的小组件组件，这样拆成各个小组件开发，有助于我们维护开发。
![](https://user-gold-cdn.xitu.io/2020/4/6/1714ebf93190ba94?w=180&h=225&f=png&s=9526)

页面引入组件
```
{
  "usingComponents": {
    "index-child": "./components/IndexChild/index",
    "index-child2": "./components/IndexChild2/index"
  }
}
```
页面由各个组件组件，分别处理组件的业务逻辑
```
<!--index.wxml-->
<view class="container">
  <index-child />
  <index-child2 />
</view>
```
## config配置
在config目录新建index.js配置项目所需的要配置
```
const BASE_URL = 'https://shop.freshlejia.com/apiStore/'  //接口请求的基本路径

export default {
  BASE_URL,
  UPLOAD_URL: `${BASE_URL}api/common/upload` //上传服务器的路径
}
```

## icons目录配置iconfont字体

* 步骤一：在iconfont.cn新建项目组
 ![](https://user-gold-cdn.xitu.io/2020/4/6/1714ecf8d743ae54?w=1135&h=701&f=png&s=62662)
* 步骤二：添加项目所需的icon，下载相对对应的文件
![](https://user-gold-cdn.xitu.io/2020/4/6/1714ed10d14bfff3?w=1316&h=437&f=png&s=60480)

* 步骤三： 项目引入相关文件
在根目录新建icons,存放刚才下载的文件吗，修改`iconfont.css`文件成`iconfont.wxss`

![](https://user-gold-cdn.xitu.io/2020/4/6/1714ed453e3aef8d?w=887&h=186&f=png&s=23613)
全局项目文件中引入
```
/**app.wxss**/
@import './icons/iconfont';
```

## images图片资源
存放图片资源，也可按模块新建子目录存放。小图标可以转base64，具体项目根据自己需求来。

![](https://user-gold-cdn.xitu.io/2020/4/6/1714ed5730c01e10?w=794&h=824&f=png&s=143459)
## utils工具包
utils目录存放和项目有关的工具包文件
### 使用http请求库flyio
 小程序提供的官方提供了request请求，但是我们需要封装成我们项目使用的请求才行，因为我们总会需要全局请求拦截处理，全局请求响应处理等，我们能不能在小程序中像`vue`项目中使用`axios`一样,[`fiyio`](https://www.baidu.com/link?url=mB9x4NiqcX8nKKh_VjjQtbP06WA96oTADNGF-BBTGLjyuJJB4kMmLcjZEYmhuUsa&wd=&eqid=b7fae54f00224add000000065e8afa16)工具包就可以帮助我们使用这个问题。我们可以有以下两种方式实现选择（推荐后者面向对象）：
 
 #### 封装请求包对象
 * 步骤一：下载`flyio`包存放在`utils`下
![](https://user-gold-cdn.xitu.io/2020/4/6/1714ee25b6698226?w=219&h=138&f=png&s=5055)

* 步骤二：封装http.js文件


```
<!--utils/http.js-->
import config from '../config/index'
const Fly = require('./flyio/index')
const fly = new Fly

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
```


 #### 封装请求基类(ES6的class方式实现)
 在`models`目录新建`request`目录，创建`request.js`基类文件，代码如下

```
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
```

创建全局请求相应状态码可以方便我们定位问题，`request`目录下创建`requestCode.js`文件

```
class RequestCode { 
  //请求状态CODE码
  static CODE = {
    SUCCESS: 2000000, //调用成功
    OPTIONS_ERROR: 5000100 //参数错误
    ...
  }
}
export default RequestCode
```

在其他模块下只要继承该请求基本,封装相对应的数据请求即可,如用户模块下`models/user.js`

```
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
```
页面中使用该模块

```
import UserModel from "../../models/user"
const user = new UserModel()
async onLoad  () {
    const res =await user.test()
    if(res.status == RequestCode.CODE.SUCCESS) {
      console.log('getSuccesss',res)
    }
},
```


### 项目工具tool处理函数文件

新建tool.js文件，编写项目工具小函数
```
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatNumber: formatNumber
}
```

### 项目业务相关工具函数文件
新建index.js文件，编写业务相关函数
```
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
```
## models模块封装类
该模块主要是采用`MVC`的M层，处理数据层面，主要包括相关的http请求等。

```
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

}

export default UserModel
```
## pages视图层
该模块主要是采用`MVC`的V层，建议按照模块分目录解构，比如用户模块的业务全部建议在user文件夹下。

![](https://user-gold-cdn.xitu.io/2020/4/6/1714ef82c2f13772?w=240&h=93&f=png&s=4752)

## wxs过滤器
项目中我们总会需要对数据进行过滤修改，我们就需要在项目中使用wxs过滤器

```
<!--order.wxs-->
/**
 * @description 将整数保留两位小数，若为整数或一位小数则补零
 * @param x 
 */
var keepTwoDecimals = function(x) {
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
  rs = s.length;
  s += '.';
  }
  while (s.length <= rs + 2) {
  s += '0';
  }
  return s;
}

module.exports = {
  keepTwoDecimals:keepTwoDecimals
}
```

页面组件中使用wxs
```
<!-- order.wxml -->
<wxs src="../../../../../filter/store.wxs" module="tools"></wxs>
<view class="statistics-content-total__count">
{{earnings.earningsAllCount ? tools.keepTwoDecimals(earnings.earningsAllCount) : 0.00}}
</view>
```
## 扩展小程序api支持promise
小程序官方现在提供的api接口是通过回调函数的方式处理，但是我们可以借助相当于的`npm`工具实现api支持`promise`，这样我们的代码就可以不用担心单调地狱并且可以很优雅的写。

```
<!--现在官方提供的写法-->
wx.getSystemInfo({
  success (res) {
    console.log(res)
  }
})

```
首先需要安装相当应的npm，安装完记得在开发者工具构建npm

```
npm install --save miniprogram-api-promise
```
在`utils/index.js`业务工具包添加相当于的处理函数

```
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

```
在小程序入口（app.js）调用该函数，存取到全局`globalData`数据中中

```
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
```
页面中使用promise化Api
```
const { globalData } =  getApp()
Page({
  data: {
  },
  onLoad  () {
    globalData.wxp.getSystemInfo().then(res => {
      console.log('getSystemInfo2',res)
    })
  },
})
```
当然也可以使用`async/await`写法，更加优雅
```
async onLoad  () {
  const res = await globalData.wxp.getSystemInfo()
  console.log('res',res)
 },
```

## vscode插件预处理器转wxss辅助开发
### less 
在开发微信小程序时，写css会比较麻烦，效率不高，最好的办法就是使用less或者sass，可以使用gulp等配置编译，但是使用此法又略显麻烦，最好的办法就是使用Vscode装一个less转wxss插件， `Easy LESS`

![](https://user-gold-cdn.xitu.io/2020/4/6/1714f0020c7a63f8?w=1200&h=671&f=png&s=399048)
1.在Vscode中搜索easy less 插件并安装；
2.在项目下建一个.vscode文件夹，并在.vscode文件夹下建一个settings.json，settings.json 中配置内容如下：

```
"less.compile": {
    "outExt": ".wxss"
}
```
3.outExt 参数为导出文件名，默认为.css，可以配置为.wxss，其他配置项可查看[文档](https://github.com/mrcrowl/vscode-easy-less)
也可以配置文件生成目录：

```
"less.compile": {
    "out": "${workspaceRoot}\\css\\css\\"
}
```
${workspaceRoot}代表当前项目的根目录，后面路径自行配置。
### sass

* vscode安装`Easy Sass`插件
![](https://user-gold-cdn.xitu.io/2020/4/7/17153fdb547d57d7?w=718&h=164&f=png&s=39972)

* settings.json配置sass

```
...
{
    "easysass.formats":[
        {
            "format": "expanded",  // 没有缩进的、扩展的css代码
            "extension": ".wxss"  //转化的后缀名
        },
    ]
}
```
## styles全局样式
项目中我们需要很多公共的样式，结合less可以帮助我们提高开发的效率

![](https://user-gold-cdn.xitu.io/2020/4/6/1714f01badbc51d5?w=385&h=193&f=png&s=11504)
## API Mock
为了让开发者更方便地开发小程序，开发者工具提供了 API Mock 的能力，可以模拟部分 API 的调用结果。Mock数据可以让我们不必等待服务端的接口，提前完成接口对接工作。微信官方开发者工具已经支持，[开发文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/api-mock.html)
## 分包加载
某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。具体需不要分包，根据自己的项目情况来，建议是项目一开始就要分模块分包，以后后期项目拓展太大超过2M，[官方分包文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)
## github项目地址
https://github.com/250786898/wx-miniProgram-init

//引入封装的接口请求函数
const fetch = require('../../utils/fetch')

Page({
   /**
   * 页面的初始数据
   */
   data: {
      slides:[],
      categories:[]
   },
   /**
    * 生命周期函数--监听页面加载   服务端和客户端
    * 客户端开发技术都有请求的api 
    * 1.发送异步请求不再是 web 服务端那套ajax
    * 2.没有跨域 
    * 3.请求的地址必须在管理后台加入白名单
    * 4.域名备案 服务端必须采用HTTPS
    */
   onLoad: function (options) {
      // 轮播接口的HTTPS请求
     /*  wx.request({
         //这里的地址没有跨域  异步请求必须是https
         url: 'https://locally.uieee.com/slides', //仅为示例，并非真实的接口地址 
         data: {
            x: '',
            y: ''
         },
         //请求头
         header: {
            'content-type': 'json' // 默认值 有两个 application 和 json
         },
         //请求过后的回调函数 (es6箭头函数)
         success: res => {
            // console.log(res.data)
            this.setData({slides:res.data})
         }
      }) */


      // 九宫格接口的HTTPS请求
     /*  wx.request({
         url: 'https://locally.uieee.com/categories', //仅为示例，并非真实的接口地址 
         //请求头
         header: {
            'content-type': 'json' // 默认值 有两个 application 和 json
         },
         //请求过后的回调函数 (es6箭头函数)
         success: res => {
            // console.log(res.data)
            this.setData({ categories: res.data })
         }
      }) */


      //封装后的轮播接口、九宫格接口的HTTPS请求  （Promise版本）
      fetch('/slides').then(res => {
         // console.log(res.data)
         this.setData({ slides: res.data })
      })

      fetch('/categories').then(res => {
         // console.log(res.data)
         this.setData({ categories: res.data })
      })

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function (options) {

   }
})

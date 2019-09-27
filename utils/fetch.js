// 接口请求数据 进行封装成工具函数  Promise  对代码有很好的可阅读性


//获取应用实例
const app = getApp()

module.exports = (url, data) => {
   wx.showLoading({ title: 'Loading...' })  //显示 loading 提示框
   return new Promise((resolve, reject) => {
      wx.request({
         // url: app.config.apiBase + url,   // app.js全局定义 然后这里调用名称
         url: `https://locally.uieee.com${url}`, //es6语法
         data: data,
         //请求头
         header: {
            'content-type': 'json' // 默认值 有两个 application 和 json
         },
         method : 'get',
         dataType: 'json',
         // 第一种写法
         success: resolve,  //请求成功
         fail: reject,      //请求失败
         // 第二种写法
        /*  success: function (res) {
            resolve.res
         },
         fail: function (err) {
            reject.err
         }, */
         complete: wx.hideLoading     // 加载提示窗 接口调用结束后的回调函数（调用成功、失败都会执行）
      })
   })
}


/* export default function request(options){
   return new Promise((resolve, reject) => {
      wx.request({
         url: options.url,
         method: data.method || 'get',
         data: options.data || {},

         success:function(res) {
            resolve.res
         },
         fail:function(err) {
            reject.err
         }
      })
   })
} */
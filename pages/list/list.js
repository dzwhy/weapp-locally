// 引入封装的js (网络请求接口的数据)
const fetch = require('../../utils/fetch.js')

Page({
   /**
    * 页面的初始数据
    */
   data: {
      category: null,  // 定义当前加载的分类
      shops: [],     //定义此分类下的全部店铺
      pageIndex: 0,  //页数
      pageSize: 20,  //每页20条数据
      totalCount: 0, //定义数据总条数
      hasMore: true,

      // 新增的搜素
      inputShowed: false,
      inputVal: ""
   },

   //封装的加载下一页 数据函数
   loadMore() {
      //es6语法
      let { pageIndex, pageSize, searchText } = this.data
      const params = { _page: ++pageIndex, _limit: pageSize }
      if (searchText) params.q = searchText

      //加载完分类信息过后再去加载商铺信息
      return fetch(`/categories/${this.data.category.id}/shops`, params)
         .then(res => {
            // 得到数据总条数的值
            const totalCount = parseInt(res.header['X-Total-Count'])
            const hasMore = this.data.pageIndex * this.data.pageSize < totalCount

            //加载下一页数据变化时进行追加条目
            const shops = this.data.shops.concat(res.data)
            this.setData({ shops, totalCount, pageIndex, hasMore })
         })
   },

   /**
    * 生命周期函数--监听页面加载   然后再是 执行 onLoad
    */
   onLoad: function (options) {
      console.log(options.cat)  //打印 判断点击九宫格时显示对应的id顺序 然后显示对应的数据内容

      //封装后的Promise版本
      fetch(`/categories/${options.cat}`).then(res => {
         this.setData({ category: res.data })
         wx.setNavigationBarTitle({ title: res.data.name })

         this.loadMore()
      })


      /*   request({
           url:"http://123.207.32.32:8000/recommend"
        }).then(res =>{
           console.log(res)
        }).catch(err =>{
           console.log(err)
        }) */
   },

   /**
    * 生命周期函数--监听页面初次渲染完成  小程序打开最先执行的是 onReady
    */
   onReady: function () {
    /*   if (this.data.category.name) {
         wx.setNavigationBarTitle({
            title: this.data.category.name
         })
      } */
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作刷新
    */
   onPullDownRefresh: function () {
      // 先清空数据
      this.setData({ shops: [], pageIndex: 0, hasMore: true })
      // 再重新加载数据 即加载 loadMore 这个封装的函数  最后停止当前页面下拉刷新
      this.loadMore().then(() => wx.stopPullDownRefresh())
   },

   /**
    * 页面上拉触底事件的处理函数 加载下一页的数据
    */
   onReachBottom: function () {
      // TODO：节流  需要判断是否正在加载 否则会有多次触发
      this.loadMore()
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function (options) {

   },




    // 新增 复制的weui框架的 搜素框组件
   showInput: function () {
      this.setData({
         inputShowed: true
      });
   },
   hideInput: function () {
      this.setData({
         inputVal: "",
         inputShowed: false
      });
   },
   clearInput: function () {
      this.setData({
         inputVal: ""
      });
   },
   inputTyping: function (e) {
      this.setData({
         inputVal: e.detail.value
      });
   }
})
const app = getApp()
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:[],
    totalPage:0,
    totalNews:0,
    nowPage:0,
  },
  showMore:function(e){
    this.setData({
      nowPage:this.data.nowPage + 1
    })
    this.loadNews(this.data.nowPage)

  },
  showDetail:function(e){
    var _this = this
    wx.navigateTo({
      url: '/pages/news/newsdetail?link=' + _this.data.news[e.currentTarget.id].Link + '&title=' + _this.data.news[e.currentTarget.id].Title,
    })
  },
  loadNews:function(pageID){
    wx.showNavigationBarLoading()
    var _this = this
    wx.request({
      url: app.globalData.urls.NEWS_URL + "/list/"+pageID+"?token=csugo-token",
      success: function (res) {
        if (res.data.StateCode != 1) {
          wx.showModal({
            title: '',
            content: res.data.Error,
            showCancel: false,
          })
          wx.hideNavigationBarLoading()          
        }else{
          _this.data.news = _this.data.news.concat(res.data.News.News)
          _this.setData({
            news: _this.data.news,
            totalPage: res.data.News.TotalPage,
            totalNews: res.data.News.TotalNews,
          })
          wx.hideNavigationBarLoading()
        }
      },
      fail: function () {
        wx.hideNavigationBarLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadNews(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
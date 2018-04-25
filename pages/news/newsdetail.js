// pages/news/newsdetail.js
var app=getApp()
var wxParser = require("../../wxParser/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
    article_html:'',
    link:'',
  },
  showOrigin:function(){
    wx.setClipboardData({ data: this.data.link })
    wx.showToast({
      title: '链接已复制',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    var _this = this
    this.setData({
      link: 'http://tz.its.csu.edu.cn/Home/Release_TZTG_zd/'+options.link
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.urls.NEWS_URL+"/article/"+options.link+"?token=csugo-token",
      success:function(res){
      if (res.data.StateCode!=1){
        wx.showModal({
          title: '',
          content: res.data.Error,
          showCancel:false
        })
        wx.hideNavigationBarLoading()
      }else{
        _this.setData({
          article:res.data.Content
        })
        wxParser.parse({
          bind: 'article_html',
          html: res.data.Content,
          target: _this,
          enablePreviewImage: false, // 禁用图片预览功能
          tapLink: (url) => { // 点击超链接时的回调函数
            wx.setClipboardData({data: url})
            wx.showToast({
              title: '链接已复制',
            })
          }
        });
        wx.hideNavigationBarLoading()
      }
      },
    })  
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
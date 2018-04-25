const urls=require("../../utils/urls.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grades:[]
  },
  doRequst:function(id,pwd){
    var _this = this
    wx.showNavigationBarLoading()
    wx.request({
      url: urls.JWC_URL + '/' + id + '/' +pwd+'/grade?token=csugo-token',
      success: function (res) {
        if (res.data.StateCode != 1) {
          wx.showModal({
            title: '提示',
            content: res.data.Error,
            showCancel: false,
          })
        }
        _this.setData({
          grades: res.data.Grades.reverse()
        })
        wx.setStorage({
          key: 'grades',
          data: res.data.Grades,
        })
        wx.hideNavigationBarLoading()
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '数据获取失败，请重试',
          showCancel: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var _this = this
    wx.getStorage({
      key: 'accounts',
      success: function(res) {
        _this.doRequst(res.data.xuehao,res.data.jwpwd)
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
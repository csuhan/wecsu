// pages/bus/bus.js
const Zan = require("../../zan/index")
const config = require("./config")
Page(Object.assign({}, Zan.Field, {

  /**
   * 页面的初始数据
   */
  data: {
    config,
    startStationIndex:0,
    endStationIndex:0,
    timeValIndex:0,
  },
  onStart:function(e){
    this.setData({
      startStationIndex: e.detail.value
    });
  },
  onEnd: function (e) {
    this.setData({
      endStationIndex: e.detail.value
    });
  },
  onTime: function (e) {
    this.setData({
      timeValIndex: e.detail.value
    });
  },
  search:function(e){
    var _this=this
    wx.showLoading({
      title: '正在查询',
    })
    wx.request({
      url: 'https://csugo.lovesmg.cn/api/v1/bus/search/' + _this.data.config.stations[_this.data.startStationIndex] + '/' + _this.data.config.stations[_this.data.endStationIndex] + '/' + _this.data.config.times[_this.data.timeValIndex]+'?token=csugo-token',
      success:function(res){
        wx.setStorage({
          key: 'buses',
          data: res.data.Buses,
        })
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/bus/busdetail?start=' + _this.data.config.stations[_this.data.startStationIndex] + '&end=' + _this.data.config.stations[_this.data.endStationIndex] + '&time=' + _this.data.config.times[_this.data.timeValIndex],
        })
        
      },
      fail:function(){
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '查询失败，重试一下？',
          showCancel:false,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
}))
// pages/hire/hire.js
const Zan =require("../../zan/index")
const config = require("./config")

Page(Object.assign({}, Zan.Tab, {

  /**
   * 页面的初始数据
   */
  data: {
    config,
    jobs:[],
  },
  loadmore:function(){
    this.setData({
      'config.pageIndex': this.data.config.pageIndex+1
    })
    this.doReq(this.data.config.selectedId, this.data.config.pageIndex, this.data.config.pageSize)
  },
  doReq:function(selectedId,pageIndex,pageSize){
    wx.showNavigationBarLoading()
    var _this = this    
    wx.request({
      url: 'https://csugo.lovesmg.cn/api/v1/job/' + selectedId + '/' + pageIndex + '/' + pageSize+'/1?token=csugo-token',
      success: function (res) {
        _this.setData({
          jobs: _this.data.jobs.concat(res.data.Jobs)
        })
        wx.hideNavigationBarLoading()
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '查询失败，请重试',
        })
        wx.hideNavigationBarLoading()       
      }
    })
  },
  handleZanTabChange: function ({componentId,selectedId}){
    this.setData({
      'config.selectedId':selectedId
    });
    this.setData({
      jobs: []
    })
    this.doReq(this.data.config.selectedId, this.data.config.pageIndex, this.data.config.pageSize)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.doReq(this.data.config.selectedId, this.data.config.pageIndex, this.data.config.pageSize)
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
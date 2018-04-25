// pages/classroom/classroom.js
const config = require("./config.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config,
    picker_xqs:[],
    picker_week:[],
    zc:0,//周次
    xq:0,//校区
    weekDay:'',//周几
    startWeekDay:''
  },
  //初始化数据
  initData:function(){
    var _this = this
    wx.getStorage({
      key: 'xq',
      success: function (res) {
        _this.setData({
          xq: res.data
        })
      },
    })
    for(var i=0;i<this.data.config.xqs.length;i++){
      this.data.picker_xqs[i] = this.data.config.xqs[i].name
    }
    for(var i=0;i<20;i++){
      this.data.picker_week[i]="第"+(i+1)+"周"
    }
    this.setData({
      picker_xqs: this.data.picker_xqs,
      picker_week: this.data.picker_week
    })
    //初始化当前周次
    var now = new Date(), date2 = new Date("2018-02-26"),
      d = Math.round((now.valueOf() - date2.valueOf()) / 86400000);
    var nowWeek = Math.ceil(
      (d + ((date2.getDay() + 1) - 1)) / 7
    );
    this.setData({
      zc: nowWeek-1
    })
  },
  onXQchange:function(e){
    console.log(e)
    this.setData({
      xq:e.detail.value
    })
  },
  onZCchange:function(e){
    this.setData({
      zc:e.detail.value
    })
  },
  searchClassroom:function(){
    var _this = this
    wx.showLoading({
      title: '正在查询',
    })
    var xqid = _this.data.config.xqs[_this.data.xq].id
    //设置校区，便于下次定位
    wx.setStorageSync('xq', _this.data.xq)
    console.log(xqid)
    wx.request({
      url: app.globalData.urls.CLS_URL+"/time/2017-2018-2/"+(parseInt(_this.data.zc)+1)+"/"+xqid+"/"+_this.data.config.jxls[xqid-1][0].jzwid+"?token=csugo-token",
      success:function(res){
        console.log(res)
        wx.hideLoading()
        if (res.data.StateCode!=1){
          wx.showModal({
            title: '',
            content: res.data.Error,
            showCancel:false
          })
        }else{
          wx.setStorage({
            key: 'classroom',
            data: { zc: parseInt(_this.data.zc) + 1,jxl: _this.data.config.jxls[xqid - 1][0],classroom:res.data.CLS},
            success:function(){
              wx.navigateTo({
                url: '/pages/classroom/clsdetail',
              })
            },
          })
        }
      },
      fail:function(){
        wx.hideLoading()
      },
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
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
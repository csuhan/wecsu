const Zan=require("../../zan/field/index.js")
Page(Object.assign({},Zan.Field,{

  /**
   * 页面的初始数据
   */
  data: {
    config:{
      xuehao:{
        title:"学号",
        inputType:'number',
        placeholder:"请输入学号",
        componentId:"xuehao",
        value:""
      },
      jwpwd:{
        title:"密码",
        placeholder:"请输入密码",
        inputType:"password",
        componentId: "jwpwd",
        value: ""     
      },
      xxmh:{
        title: "密码",
        placeholder: "请输入密码",
        inputType: "password",
        componentId: "xxmhpwd",
        value: ""
      },
      tsg:{
        title:"密码",
        placeholder:"请输入密码",
        inputType:"password",
        componentId: "tsg",
        value: ""         
      },
    }
  },
  _handleZanFieldChange(e) {},
  _handleZanFieldFocus({ componentId, detail }) {},
  _handleZanFieldBlur(e) {
    if (e.currentTarget.dataset.componentId == "xuehao") {
      this.setData({
        'config.xuehao.value': e.detail.value
      })
    }
  },
  saveSetting:function(e){
    wx.setStorage({
      key: 'accounts',
      data: {
        xuehao:e.detail.value.xuehao,
        jwpwd: e.detail.value.jwpwd,
        tsgpwd: e.detail.value.tsg,
        xxmhpwd:e.detail.value.xxmhpwd      
      },
    })
    wx.showToast({
      title: '保存成功',
    })
  wx.reLaunch({
    url: '/pages/index/index',
  })
  },
  showQuestion:function(){
    wx.showModal({
      title: '提示',
      content: "用户信息均在本地加密保存，不会上传到服务器。\r\n\r\n图书馆初始密码与学号相同",
      showCancel: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.info){
      wx.showToast({
        title: options.info,
        icon:"none"
      })
    }
    var _this=this
    wx.getStorage({
      key: 'accounts',
      success: function(res) {
        console.log(res)
        _this.setData({
          'config.xuehao.value':res.data.xuehao,
          'config.jwpwd.value':res.data.jwpwd,
          'config.xxmh.value':res.data.xxmhpwd,
          'config.tsg.value':res.data.tsgpwd,
        })
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
}))
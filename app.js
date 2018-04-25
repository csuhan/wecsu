//app.js
const urls =require("/utils/urls.js")
App({
  onLaunch: function() {
    var _this=this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //登录获取用户信息
    var _this = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.setStorageSync('code', res.code)
          wx.request({
            url: urls.LOGIN_URL,
            method: "POST",
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorage({
                key: 'wxtoken',
                data: res.data.wetoken,
              })
            },
            fail: function () {

            }
          }),
            wx.getUserInfo({
              success: function (res) {
                wx.setStorageSync('userInfo', res.userInfo)
              },
              fail: function (e) {
                console.log(e)
              }
            })
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '微信登录失败，请重试',
        })
      }
    })
    
  },
  globalData: {
    urls:urls,
    userInfo: null
  }
})

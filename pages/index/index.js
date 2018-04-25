const grids=require("./grids")
var app=getApp();
Page({
  data:{
    grids,
    todayClass:null,
  },
  checkAccount:function(accounts,authType){
    switch (authType){
      case "jwc":
        if(accounts.xuehao==''||accounts.jwpwd==''){
          wx.navigateTo({
            url: '/pages/me/account?info=请完善教务系统信息',
          })
          return false
        }
        break
      case "xxmh":
        if (accounts.xuehao == '' || accounts.xxmhpwd == '') {
          wx.navigateTo({
            url: '/pages/me/account?info=请完善信息门户信息',
          })
          return false
        }
        break
      case "tsg":
        if (accounts.xuehao == '' || accounts.tsgpwd == '') {
          wx.navigateTo({
            url: '/pages/me/account?info=请完善图书馆信息',
          })
          return false
        }
        break
        default:
          break
    }
    return true
    //信息不完整
  },
  switchApp:function(e){
    console.log(e)
    var _this=this
    console.log(this.data.grids[e.currentTarget.dataset.id])
    var iapp=this.data.grids[e.currentTarget.dataset.id]
    if (iapp.needAuth){ //需要账号密码的应用
      var _iapp=iapp
      wx.getStorage({
        key: 'accounts',
        success: function(res) {
          console.log(res)
          if(_this.checkAccount(res.data,_iapp.authType)){
            wx.navigateTo({
              url: _iapp.url,
            })
          }
        },
        fail: function () {
          wx.navigateTo({
            url: '/pages/me/account?info=请完善用户信息'
          })
        }
      })
    }else{
      wx.navigateTo({
        url: iapp.url,
      })
    }
  },
  loadClass:function(){
    var _this = this;
    var now = new Date(), date2 = new Date('2018-02-26'),
      d = Math.round((now.valueOf() - date2.valueOf()) / 86400000);
    var week = Math.ceil(
      (d + ((date2.getDay() + 1) - 1)) / 7
    );
    var today = now.getDay();
    if(today==0)today=7;
    //请求数据
    wx.getStorage({
      key: 'accounts',
      success: function (res) {
        var id = res.data.xuehao
        var pwd = res.data.jwpwd
        wx.request({
          url: app.globalData.urls.JWC_URL + '/' + id + '/' + pwd + '/class/2017-2018-2/' + week + '?token=csugo-token',
          success: function (res) {
            console.log(res)
            //_this.data.todayClass
            _this.setData({
              classes: _this.data.classes,
            })
          }
        })
      }
    })
  },
  onLoad:function(){
    //检查用户信息是否完整
    wx.getStorage({
      key: 'accounts',
      fail:function(){
        wx.showModal({
          title: '',
          content: '请先完善用户信息',
          success:function(res){
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/me/account',
              })
            }
          }
        })
      },
    })
    //数据请求，加载课表
    
  },
  onShow:function(options){
  
  }
})
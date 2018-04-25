const Zan = require("../../zan/index.js")
const urls = require("../../utils/urls.js")
Page(Object.assign({}, Zan.Field, {

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      xuehao:{
        title:'学号',
        placeholder:"请输入学号",
        inputType:'number',
        value:"",
        componentId:'xuehao'
      },
      xm:{
        title:'姓名',
        placeholder:'请输入姓名',
        value:'',
        componentId:'xm'
      }
    }

  },
  _handleZanFieldChange({ componentId, detail }) {},
  _handleZanFieldFocus({ componentId, detail }) {},
  _handleZanFieldBlur({ componentId, detail }) {},
  cetQuery:function(e){
    console.log(e)
    var _this = this
    if (e.detail.value.xuehao != '' && e.detail.value.xm != '') {
      wx.showLoading({
        title: '正在查询',
      })
      wx.request({
        url: urls.CET_URL+'/hgrade/'+e.detail.value.xuehao+'/'+e.detail.value.xm+'?token=csugo-token',
        success:function(res){
          wx.hideLoading()
          if(res.data.StateCode!=1){
            wx.showModal({
              title: '',
              content: res.data.Error,
            })
          }else{
            wx.setStorage({
              key: 'cets',
              data: res.data.HGrades,
            })
            wx.navigateTo({
              url: '/pages/cet/cetdetail',
            })
            
          }
          
        },
        fail:function(){
          wx.showModal({
            title: '',
            content: '网络错误，请检查网络连接',
            showCancel:false
          })
          wx.hideLoading()          
        }
      })      
    } else {
      wx.showModal({
        title: '',
        content: '请输入学号和姓名',
        showCancel: false
      })
    }
    
  },
  onLoad: function (options) {
    var _this = this
    wx.getStorage({
      key: 'accounts',
      success: function(res) {
        _this.setData({
          'form.xuehao.value':res.data.xuehao
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
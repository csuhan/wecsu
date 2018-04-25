const Zan = require("../../zan/index")
const config =require("./config.js")
var app = getApp()
Page(Object.assign({}, Zan.Tab, {

  /**
   * 页面的初始数据
   */
  data: {
    config,
    tab:{
      list: [],
      scroll: true,
      height: 45,
      selectedId: "",
    },
    classroom:'',
    jxl:[],
    zc:0,
    day:0,
    weekday:["周一","周二","周三","周四","周五","周六","周日"],
    freetimes:[],

  },
  handleZanTabChange: function ({ componentId, selectedId }) {
    this.setData({
      'tab.selectedId': selectedId
    });
    this.getFreetimeData()
    
  },
  changeDay:function(e){
    this.setData({
      day:e.detail.value
    })
    console.log(e.detail.value)
    this.parseFreetime()
  },
  getFreetimeData:function(){
    var _this = this
    wx.request({
      url: app.globalData.urls.CLS_URL + "/time/2017-2018-2/" + (parseInt(_this.data.zc) + 1) + "/" + _this.data.jxl.XQ.ID + "/" + _this.data.tab.selectedId + "?token=csugo-token",
      success: function (res) {
        if(res.data.StateCode!=1){
          wx.showModal({
            title: '',
            content: res.data.Error,
            showCancel:false
          })
        }else{
          _this.setData({
            classroom: res.data.CLS
          })
          _this.parseFreetime()
        }
      },
    })
  },
  parseFreetime:function(){
    this.data.freetimes = []    
    for (var i = 0; i < this.data.classroom.length; i++) {
      var freetime = []
      for (var j = 0; j < 5; j++) {
        freetime[j] = this.data.classroom[i].FreeWeekTime[parseInt(this.data.day) + j * 7]
      }
      this.data.freetimes[i] = {
        name: this.data.classroom[i].jsmc,
        freetime: freetime
      }
    }
    //对数组自然排序
    var compare = function (prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop]; if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
    this.data.freetimes.sort(compare("name"))
    this.setData({
      freetimes: this.data.freetimes
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    //设置当前周天：如周三
    this.setData({
      day:new Date().getDay()-1
    })
    //获取页面传递数据
    wx.getStorage({
      key: 'classroom',
      success: function(res) {
        console.log(res)
        _this.setData({
          classroom:res.data.classroom,
          jxl:res.data.jxl,
          zc:res.data.zc
        })
        //设置tab数据
        var jxls = _this.data.config.jxls[_this.data.jxl.XQ.ID - 1]
        for (var i = 0; i < jxls.length; i++) {
          console.log(jxls[i])
          _this.data.tab.list[i]={id:jxls[i].jzwid,title:jxls[i].jzwmc}
        }
        _this.setData({
          'tab.list': _this.data.tab.list,
          'tab.selectedId': jxls[0].jzwid
        })
        //解析时间
        _this.parseFreetime()
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
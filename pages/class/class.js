var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:0,
    weekDates:[
      {Week: '周一',Date: ''},
      {Week: '周二',Date: ''},
      {Week: '周三',Date: ''},
      {Week: '周四',Date: ''},
      {Week: '周五',Date: ''},
      {Week: '周六',Date: ''},
      {Week: '周日',Date: ''}
    ],
    colorTables: ['#d50000', '#c51162', '#aa00ff', '#6200ea', '#304ffe', '#2962ff', '#0091ea', '#00b8d4', '#00bfa5', '#00c853', '#64dd17', '#aeea00', '#ffd600', '#ffab00', '#ff6d00','#dd2c00'],
    weeks:[],
    //TODO 起始时间改正
    startWeekDay:'',
    classes:[],
    popClassId:'',
    popClassVisible:false,
    hasClass:false,
  },
  bindWeeksChange:function(e){
    console.log(e)
    this.setData({
      week: e.detail.value
    })
    this.loadData(this.data.week)
  },
  //初始化日期
  initDate:function(){
    //初始化周次
    this.data.weeks[0]="总课表"
    for(var i=1;i<=20;i++){
      this.data.weeks[i] = "第" + i + "周"
    }
    this.setData({
      weeks:this.data.weeks,
      startWeekDay: new Date("2018-02-26")
    })

    //设置当前周次
    var now = new Date(), date2 = this.data.startWeekDay,
      d = Math.round((now.valueOf() - date2.valueOf()) / 86400000);
    var nowWeek = Math.ceil(
      (d + ((date2.getDay() + 1) - 1)) / 7
    );
    this.setData({
      week:nowWeek
    })

    //设置今日日期
    this.data.weekDates[new Date().getDay()-1].isToday=true
    var monday = new Date()
    monday.setDate(monday.getDate() - monday.getDay()+1)
    //获取一周的日期
    for (var i=0;i<=6;i++){
      var tempDay=new Date()
      tempDay.setDate(monday.getDate()+i)
      var day=tempDay.getDate()
      var month=tempDay.getMonth()
      this.data.weekDates[i].Date=(month+1)+'-'+day
    }
    this.data.weekDates.unshift({Week:(new Date().getMonth()+1)+'月',Date:''})
    this.setData({
      weekDates:this.data.weekDates
    })
  },
  showClassDetail:function(e){
    console.log(e)
    this.setData({
      popClassId:e.currentTarget.dataset.id,
      popClassVisible:true
    })
  },
  hidePopClass:function(e){
    this.setData({
      popClassId: '',
      popClassVisible: false
    })
  },
  loadData:function(week){
    var _this = this;
    wx.showNavigationBarLoading()
    wx.getStorage({
      key: 'accounts',
      success: function (res) {
        var id = res.data.xuehao
        var pwd = res.data.jwpwd
        wx.request({
          url: app.globalData.urls.JWC_URL + '/' + id + '/' + pwd + '/class/2017-2018-2/' + week + '?token=csugo-token',
          success: function (res) {
            wx.hideNavigationBarLoading()
            console.log(res)
            _this.data.classes = res.data.Class
            for (var i = 0; i < res.data.Class.length; i++) {
              for (var j = 0; j < res.data.Class[i].length; j++) {
                _this.data.classes[i][j].Color = _this.data.colorTables[Math.round(Math.random() * (_this.data.colorTables.length - 1))]
              }
            }
            console.log(_this.data.classes)
            _this.setData({
              classes: _this.data.classes,
              hasClass: true
            })
          }
        })
      },
      fail:function(){
        wx.navigateTo({
          url: '/pages/me/account?info=请完善教务信息',
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDate()//初始化日期
    this.loadData(this.data.week)
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
    if (this.data.classes == '') {
      this.loadData(this.data.week)
    }
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
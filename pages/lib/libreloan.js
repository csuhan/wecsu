const urls=require("../../utils/urls.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    hasNoBook:false,
    id:'',
    pwd:'',
    checkedBooks:[],
    popupBook:{},
    showMark:false,
  },
  checkbook:function(e){
    console.log(e, e.currentTarget.dataset.id)
    if (this.data.checkedBooks[e.currentTarget.dataset.id]==true){
      this.data.checkedBooks[e.currentTarget.dataset.id] = false
      this.setData({
        checkedBooks:this.data.checkedBooks
      })
    }else{
      this.data.checkedBooks[e.currentTarget.dataset.id] = true
      this.setData({
        checkedBooks: this.data.checkedBooks
      })
    }
  },
  checkAll:function(e){
    for(var i=0;i<this.data.checkedBooks.length;i++){
      this.data.checkedBooks[i]=true
    }
    this.setData({
      checkedBooks:this.data.checkedBooks
    })
  },
  reloan:function(e){
    var hasBooks=false
    for(var i=0;i<this.data.checkedBooks.length;i++){
      if (this.data.checkedBooks[i]==true){
        hasBooks=true
      }
    }
    var _this = this
    if(hasBooks==false){
      wx.showModal({
        title: '',
        content: '您还未选择图书',
        showCancel:false,
      })
    }else{
      //拼接请求数据
      var barCodes = ""    
      for(var i=0;i<this.data.checkedBooks.length;i++){
        if (this.data.checkedBooks[i]==true){
          barCodes += '+' + this.data.books[i].BarCode
        }
      }
      wx.showNavigationBarLoading()
      wx.request({
        url: urls.LIB_URL+'/reloan/'+this.data.id+'/'+this.data.pwd+'/'+barCodes+'?token=csugo-token',
        success:function(res){
          if(res.data.StateCode!="1"){
            wx.showModal({
              title: '提示',
              content: res.data.Error,
            })
          }else{
            console.log(res)
            var states=''
            for(var i=0;i<res.data.Books.length;i++){
              states += (i+1)+'、'+res.data.Books[i].BookName + ':' + res.data.Books[i].ReloanRes+'\r\n'
            }
            wx.showModal({
              title: '续借结果',
              content: states,
              showCancel:false
            })
          }
          wx.hideNavigationBarLoading()
        }
      })

    }
  },
  showBookDetail:function(e){
    console.log(e)
    this.setData({
      popupBook:this.data.books[e.currentTarget.dataset.id],
      showMark:true
    })
  },
  hideMark:function(){
    this.setData({
      showMark: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.getStorage({
      key: 'accounts',
      success: function(res) {
        _this.setData({
          id:res.data.xuehao,
          pwd:res.data.tsgpwd
        })
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({
          title: '正在查询',
        })
        wx.request({
          url: urls.LIB_URL + '/list/' + res.data.xuehao + '/' + res.data.tsgpwd + '?token=csugo-token',
          success: function (res) {
            if (res.data.StateCode != "1") {
              wx.showModal({
                title: '提示',
                content: res.data.Error,
              })
            }
            _this.setData({
              books: res.data.Books,
            })
            if(res.data.Books.length==0){
              _this.setData({
                hasNoBook:true
              })
            }
            var checkedBooks=[]
            for (var i=0;i<res.data.Books.length;i++){
              checkedBooks[i]=false
            }
            _this.setData({
              checkedBooks:checkedBooks
            })
            wx.hideNavigationBarLoading()
            wx.setNavigationBarTitle({
              title: '图书续借',
            })
          },
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
})
// pages/playmusic/playmusic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs:[],
    title:[],
    nowindex:0,
    namelength:0,
    isall:""
  },

  init: function () {
    wx.request({
      url: 'https://www.fastmock.site/mock/12af8b4d415489efd3530c59b6c7ad2c/music/getsong',
      success:  (res)=> {
        // console.log(res) 
        
        for(var i=0;i<res.data.data[this.data.nowindex].songname.length;i++){
          this.data.title.push("")
        }
        //console.log(this.data.title) 
        this.setData({
          songs:res.data.data,
          title:this.data.title,
          namelength:res.data.data[this.data.nowindex].songname.length
        })
      }
    })
  },
  claretext:function(e){
    this.data.title[e.target.id]=""
    this.setData({isall:""})
    this.setData({title:this.data.title})
  },
  getitem:function(e){
    var word=this.data.songs[this.data.nowindex].keyword[e.target.id]
    //console.log(word)
    //this.data.title.push(word)
    for(var i=0;i<this.data.title.length;i++){
      if(this.data.title[i]==""){
        this.data.title[i]=word
        break
      }
      if(i==this.data.title.length-2){
        this.setData({isall:"all"})
      }
    }
    this.setData({title:this.data.title})
    if(this.data.isall=="all"){
      if(this.data.songs[this.data.nowindex].songname==this.data.title.join('')){
        wx.vibrateShort({
        })
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '哦呀，不错嘛宝宝，下一个',
          success:(res)=> {
            if (res.confirm) {
              if(this.data.songs.length-1==this.data.nowindex){
                wx.redirectTo({
                  url:'/pages/winpage/winpage',
                })
              }else{
                var index=this.data.nowindex+1
                this.setData({
                  nowindex:index,
                  isall:"",
                  title:[]
                })
                wx.setNavigationBarTitle({
                  title: '涵涵识曲-第'+(this.data.nowindex+1)+"首",
                })
                this.init()
              }
            } 
          }
        }) 
      }else{
        wx.vibrateShort({
        })
        wx.showToast({
          title: '答案不存在',
          icon: 'none',
          image:'/image/2.png',
          duration: 2000
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    return{
      title:'紧急呼救，我卡在第'+(this.data.nowindex+1)+'关',
      path:'/pages/playmusic/playmusic'
    }
  }
})
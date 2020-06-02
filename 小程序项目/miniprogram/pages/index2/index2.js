// pages/index/index2.js
var app = getApp()
var util = require('../../utils/util.js')
var formatLocation = util.formatLocation

Page({
  data: {
    user:{}
  },
  // 指定 全部订单 选项卡中 与之对应的tab
  allOrder:function(){
    app.globalData.currentLocation = 0,
    wx.navigateTo({ url: '../order/order'})
  },
  waitPay:function(){
    app.globalData.currentLocation = 1,
    // console.log(app.globalData.currentLocation);
    wx.navigateTo({ url: '../order/order'})  
  },
  waitAccept:function(){
    app.globalData.currentLocation = 2,
    wx.navigateTo({ url: '../order/order'}) 
  },
  alAccept:function(){
    app.globalData.currentLocation = 3,
    wx.navigateTo({ url: '../order/order'}) 
  },
  alComplete:function(){
    app.globalData.currentLocation = 4,
    wx.navigateTo({ url: '../order/order'}) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    const user = wx.getStorageSync('userInfo');
    this.setData({
      user
    });
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
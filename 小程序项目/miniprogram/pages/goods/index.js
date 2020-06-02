/*
 * @Author: your name
 * @Date: 2020-05-01 10:18:32
 * @LastEditTime: 2020-05-01 11:04:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yun\miniprogram\pages\goods\index.js
 */
// miniprogram/pages/goods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },
  getGoods(id){
    const db = wx.cloud.database()
    db.collection('need').where({
      _id: id // 填入当前用户 openid
    }).get().then(res => {
      this.setData({
        goods:res.data
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options;
    this.getGoods(id);
    
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
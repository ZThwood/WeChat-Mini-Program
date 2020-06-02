// 在其他页面读取以及修改globalData。不论是读取还是修改，首先需要在应用的页面js文件中，引用app()实例
const app = getApp()
Page({
  data: {
    navbar: ['全部', '待支付', '待接单', '已接单','已完成'],
    currentTab:0,
  },

  //点击切换tab
  navbarTap: function (e) {
    // console.log(e);
    this.setData({
      // idx是页面自定义属性date-idx
      //currentTarget 事件属性返回其监听器触发事件的节点
      //点击获得的值给currentTab
      currentTab: e.currentTarget.dataset.idx
    })
  },

   /*  滑动切换tab  */
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  onShow() {
    // this.setData({
    //   currentTab: app.globalData.currentTab
    // })
    // console.log();
    if (app.globalData.currentLocation == '') {
      this.setData({
        currentTab: 0
      });
    } else {
      var i = app.globalData.currentLocation;
      this.setData({
        currentTab: i
      });
    }
  }
})
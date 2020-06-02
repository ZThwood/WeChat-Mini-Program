// pages/index1/index1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectData:['点击选择分类','找代拿','找代买','找出行'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    addressData:{},
    longAddre:'',
    pice:0.0,
    needData:{},
    time:'',
    title:'',
    contens:'',
    showDialog: false,
    passWord: '',
    passWordArr: [],
    inputShowed: false
  },
  //获取类型
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  //获取时间
  changeTime(e){
     console.log(e)
    let {value} = e.detail;
    this.setData({
      time:value
    });
  },
  changeTitle(e) {
    // console.log()
    this.setData({
      title: e.detail.value
    });
  },
  changeText(e) {
    this.setData({
      contens: e.detail.value
    });
  },
getAddress:function(){
  //1.获取收货地址
  /**  重点
   * 问题：用户点击取消之后无法再次进入
   * 解决：通过状态码来开启api
   * 优化：通过promise同步代码
   */
 //1.获取状态码
 wx.getSetting({
   success: (result)=>{
     //成功获取，不过这里的属性名很奇怪 authSetting下的属性名scope.address         
     const scopeAddress = result.authSetting["scope.address"];
     if(scopeAddress===true || scopeAddress===undefined)
     {
       //只有状态码为 true 和 undefined才有权限开启收货地址
       wx.chooseAddress({
         success: (result1)=>{
           //成功之后把数据保存在本地
            wx.setStorageSync('address',result1);
         }
       });
     }else{
         //用户之前拒绝了授予权限，所以要开次开启
         wx.openSetting({
           success: (result3)=>{
             console.log(result3);
           }
         });    
     }
   }
 });
},
/**
 * 获取地址信息，存在缓存中
 */
onShow: function () {
  const addressData = wx.getStorageSync("address");
  const longAddre = addressData.provinceName+ addressData.cityName+addressData.countyName+addressData.detailInfo;
  this.setData({
    addressData,
    longAddre
  });
},
/**
 * 金额动态渲染
 * @param {*} e 
 */
changeMen(e){
  let {value} = e.detail;
  if (value == ' ') {
    wx.showToast({
      title: '请输入金额',
      duration: 1500,
      mask: true
    });
  } 
  this.setData({
    pice:value
  });
},
getData(){
  /**
   * 获取数据信息
   * 姓名，电话，收货地址，金额，分类，标题，内容 时间
   */
  let {addressData} = this.data;
  let {longAddre} = this.data;
  let {pice} =this.data;
  let {time} =this.data;
  let {title} = this.data;
  let {contens} = this.data;
  let {index} = this.data;
  return [index,addressData,longAddre,title,contens,time,pice]
},
/**
 * 获取用户的数据，把数据添加到数据库
 * @param {*} e 
 */
  formSubmit(e) {
    let Appdata = this.getData();
    let { title, contens, sort } = e.detail.value;
    // console.log(e.detail.value);
    let that = this
    console.log(that.data.passWord.length)
    if (that.data.passWord.length == 0) {
      that.isShowToast('请输入密码');
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return;
    } else if (that.data.passWord.length < 6) {
      wx.showToast({
        title: '请输入6位密码',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      this.setData({
        needData: {
          //index,addressData,longAddre,title,contens,time,pice
          name: Appdata[1]['userName'],
          telephone: Appdata[1]['telNumber'],
          pice: Appdata[6],
          address: Appdata[2],
          title: title,
          contens: contens,
          sort: sort,
          time: Appdata[5]
        }
      });
      // console.log(this.needData);

      wx.cloud.init();
      //写入数据库
      // 1. 获取数据库引用
      const db = wx.cloud.database();
      db.collection('need').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          address: this.data.needData.address,
          contens: this.data.needData.contens,
          name: this.data.needData.name,
          pice: this.data.needData.pice,
          sort: this.data.needData.sort,
          telephone: this.data.needData.telephone,
          time: this.data.needData.time,
          title: this.data.needData.title,
          creatTime: new Date().getTime()
        },
        success: function (res) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            mask: true
          });
          setTimeout(() => {
            wx.redirectTo({
              url: '../../packageA/pages/find/find',
              success: (result) => {

              },
              fail: () => { },
              complete: () => { }
            });
          }, 2000);
        },
        fail: console.error
      })
    }
  },
// 弹出密码框的js
onClickButton: function () {
  let Appdata = this.getData();
  console.log(Appdata);
   //还差几个判断条件
   //index,addressData,longAddre,title,contens,time,pice
  if (Appdata[6] == 0 || Appdata[5] == '' || Appdata[0] == 0 ||Appdata[5] == 0 || ['userName']==''){
    wx.showToast({
      title: '请完善信息',
      icon: 'error',
      image:"../../icon/error.png",
      duration: 1500,
      mask: true
    });
    return
  };
  let that = this;
  that.setData({
    showDialog: !this.data.showDialog
  });
  var timer = setTimeout(() => {
    that.setData({
      inputShowed: true
    });
  }, 500)
  },
  // 点击弹出框旁边可以退出
  onClickdiaView: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
    // clearTimeout(timer);
    // wx.hideKeyboard()
  },
  //密码框绑定
  onChangeInput: function (e) {
    let that = this;
    console.log(e.detail.value.length)
    if (e.detail.value.length > 6) {
      return;
    }
    if (e.detail.value.length > that.data.passWord.length) {
      that.data.passWordArr.push(true);
    } else if (e.detail.value.length < that.data.passWord.length) {
      that.data.passWordArr.pop();
    }
    // console.log(e)
    that.setData({
      passWord: e.detail.value,
      passWordArr: that.data.passWordArr
    });
  },
  isShowToast: function (title) {
    this.setData({
      toastShow: true,
      title: title
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        toastShow: false
      });
    }, 1500); 
  },


 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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



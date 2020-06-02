/*
 * @Author: your name
 * @Date: 2020-04-27 14:02:08
 * @LastEditTime: 2020-05-02 15:36:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yun\miniprogram\packageA\pages\find\find.js
 */
// pages/find/find.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[
      {
        id:0,
        title:'找代拿',
        isActive:true
      },
      {
        id:1,
        title:'找代买',
        isActive:false
      },
      {
        id:2,
        title:'找出行',
        isActive:false
      }
    ],
    id:0,
    needData:[],
    //查询到数据的总条数
    pageTotal:0,
    //一页显示多少条
    pageNum:10,
    page:2
  },
  type:'找代拿',
  changeItemColor(e){
    //1.拿到标题的索引
    const {index} = e.detail;
    //2.修改原数组
    let {tabList} = this.data;
    tabList.forEach((v,i )=>i===index?v.isActive=true:v.isActive=false);
    //3.赋值到原数组
    this.setData({
      tabList
    });
  },
  
  getid(){
    //遍历data的list如果为true就
    const {tabList} = this.data;
    for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].isActive) {
          this.setData({
            id:tabList[i].id
          });
        }
    }
    if (this.data.id==0) {
      this.type = '找代拿';
    } 
    if(this.data.id==1){
      this.type = '找代买';
      console.log(1111); 
    }
    if(this.data.id==2){
      this.type = '找出行';
      console.log(22222);
    }
    this.setData({
      needData:[],
      //查询到数据的总条数
      pageTotal:0,
      //一页显示多少条
      pageNum:10,
      page:2
    });
    if (this.data.needData.length>this.data.pageTotal) {
      return;
    }
    this.getDBData(this.type);  
    this.getCount(this.type);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDBData(this.type);
    this.getCount(this.type);
  },
//获取数据库的数据
  getDBData(type='找代拿',page=0){
    db.collection('need')
    .orderBy("creatTime",'desc')
    .where({
      sort:type
    })
    .skip(page)
    .limit(this.data.pageNum)
    .get()
    .then(res => {
      this.setData({
        //数组的拼接
        needData:[...this.data.needData,...res.data]
      }); 
      wx.stopPullDownRefresh(); 

    });
     
  },
  //获取有多少条数据
  getCount(type){
    db.collection('need')
    .where({
      sort:type
    })
    .count().then(res => {
     this.setData({
       pageTotal:res.total
     });
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   needData:[],
    //   //查询到数据的总条数
    //   pageTotal:0,
    //   //一页显示多少条
    //   pageNum:10,
    //   page:2
    // });

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      needData:[],
      //查询到数据的总条数
      pageTotal:0,
      //一页显示多少条
      pageNum:10,
      page:2
    });
    this.getDBData(this.type,0,10);  
    this.getCount(this.type);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     /**
     * 下拉触底之后
     * 1.原数组再添加多十条数据
     * 2.要知道这个集合有多少条数据 pageTotal
     *   一页显示多少条 pageNum  当前页 page 触发一次 page就++
     *   一共分了几页  pageCount
     *   
     */
    //因为显示的时候就是第一页了
     let page = this.data.page++;
    //查询到的数据一共能分几页  使用向上取整
    let pageCount = Math.ceil(this.data.pageTotal/this.data.pageNum);
    /**
     * 1  0  10, 2 10 10, 3 20 10
     */
    let skip = (page -1) * this.data.pageNum;
    if (page > pageCount) {
      wx.showToast({
        title: '我也是有底线的',
        image: '../../../icon/error.png',
        duration: 1500,
        mask: true
      });
    }else{
      wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 1500,
      mask: true,
      success: (result)=>{
        this.getDBData(this.type,skip);
      },
    });
    }
 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
// pages/address/address.js
/*
1获取 用户的收货地址
1绑定点击事件
2调用小程序内置api 获取用户的收货地址 wx.chooseAddress
3获取用户对小程序所授予获取地址的权限 状态 scope
1假设 用户点击获取收货地址的提示框 确定 autjSetting scope.address scope  值 true
2假设 用户点击获取收货地址的提示框 取消
scope 值 false 
3假设用户从来没有点击过收货地址的api
scope undefinded
1 诱导用户自己开授权设置页面 当用户重新给予获取地址权限的时候
2获取收货地址
*/
// import { getSetting,chooseAddress,openSetting } from "../../utils/asyncWx.js";
// import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  handleChooseAddress(){
    //获取收货地址
    wx.getSetting({
      success: (result) => {
        //获取权限状态，主要发现一些属性名很怪异都要用[]行还是获取属性值
        const scopeAddress=result.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1);
            },
          });
        }else{
          //用户以前拒绝过授予权限
          wx.openSetting({
            success: (result2) => {
              console.log(result2);
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3);
                },
              });
            }
          });
        }
      },
    });
  }
})
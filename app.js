//app.js
import api from '/utils/wxRequest.js';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
        if(res.code){
          wx.getUserInfo({
            success: data => {
              let da = {
                  "code": res.code,
                  "rawData": data.rawData,
                  "signature": data.signature,
                  'iv': data.iv,
                  'encryptedData': data.encryptedData,
              }
              api.wxRequest.post('/login',da, info => {
                if (info.code == 200) {
                  // console.log(info)
                  this.globalData.userInfo = info.data.userInfo
                  wx.setStorage({
                    key: 'token',
                    data: info.data.token,
                  })
                  // console.log('app:',this.globalData.userInfo)
                } else {
                  console.log(info.errMsg)
                }
              }, err => {
                console.log(err)
              })

            },
            fail: fail => {
              console.log(fail);
            }
          })
        } else{
          wx.showToast({
            title: '登陆失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log('222')

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    baseUrl: "http://127.0.0.1:8000",
    // baseUrl: "http://39.108.74.208:8000",
  }
})
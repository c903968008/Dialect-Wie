// pages/home/home.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    district: '',
    count: 0,
  },

  //跳转至用户信息界面
  toUser: function(){
      wx.navigateTo({
        url: '/pages/user/user',
      })
  },

  //跳转至活动通知界面
  toNotice: function () {
    wx.navigateTo({
      url: '/pages/notice_list/notice',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setTimeout(function(){
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        // console.log('app')
        console.log('userInfo',that.data.userInfo);
        console.log('1')
      } else if (that.data.canIUse) {
        console.log('2')
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          console.log(res)
          console.log('wei')
          console.log(res.userInfo);
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        console.log('3')
        // 在没有 open-type=getUserInfo 版本的兼容处理
        console.log('else')
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },1000)
    
  },

  getUserInfo: function (e) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
        if (res.code) {
          wx.getUserInfo({
            success: data => {
              let da = {
                "code": res.code,
                "rawData": data.rawData,
                "signature": data.signature,
                'iv': data.iv,
                'encryptedData': data.encryptedData,
              }
              api.wxRequest.post('/login', da, info => {
                if (info.code == 200) {
                  // console.log(info)
                  app.globalData.userInfo = info.data.userInfo
                  wx.setStorage({
                    key: 'token',
                    data: info.data.token,
                  })
                  this.setData({
                    userInfo: info.data.userInfo,
                    hasUserInfo: true
                  })
                  // console.log('app:',app.globalData.userInfo)
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
        } else {
          wx.showToast({
            title: '登陆失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
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
    // console.log('show')
    if(this.data.count == 1){
      var param = {
        id: app.globalData.userInfo.id
      }
      api.wxRequest.get('/user/show', param, res => {
        if (res.code == 200) {
          // console.log(res.data)
          var acc = 'userInfo.accuracy'
          this.setData({
            [acc]: res.data.accuracy
          })
        } else {
          console.log(res.msg)
        }
      }, err => {
        console.log(err)
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      count: 1
    })
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
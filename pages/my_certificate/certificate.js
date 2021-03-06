// pages/certificate/certificate.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    certificate: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.wxRequest.get('/certificate/user/list', res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.forEach(function (item, index) {
          item.time = item.created_at.split(' ')[0]
        })
        this.setData({
          certificate: res.data
        })
        console.log(this.data.certificate)
      } else if (res.code == 500) {
        console.log(res.msg)
      } else {
        console.log(res.errMsg)
      }
    }, err => {
      console.log(err)
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
// pages/notice/notice.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: []
  },

  toDetail(e){
    wx.navigateTo({
      url: '/pages/notice/notice?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.wxRequest.get('/notice', res => {
      if (res.code == 200) {
        res.data.forEach(function (item, index) {
          item.time = item.time.split(' ')[0]
          item.image = app.globalData.baseUrl + '/activity/' + item.image
        })
        this.setData({
          notice: res.data
        })
        // console.log(this.data.notice)
      } else if (res.code == 500) {
        this.setData({
          notice: []
        })
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
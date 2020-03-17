// pages/rank/rank.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    TabCur: 0,
    scrollLeft: 0,
    currentPage: 0,
    tab: ['正确率','答题总数']
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      currentPage: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.id == 0){
      this.getList('right')
    } else if (e.currentTarget.dataset.id == 1) {
      this.getList('total')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList('right')
  },

  getList(type){
    var param = {
      type: type
    }
    api.wxRequest.get('/user/rank', param, res => {
      if (res.code == 200) {
        console.log(res.data)
        this.setData({
          user: res.data.rank,
          my_rank: res.data.my_rank
        })
      } else {
        console.log(res.msg)
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
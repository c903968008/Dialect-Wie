// pages/feedback/feedback.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: ['未查看', '未接受', '已接受'],
    feedback: []
  },

  tabSelect(e) {
    // console.log(e.currentTarget.dataset.id)
    this.getFeedback(e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  //查看
  toDetail(e){
    // console.log(e.target.dataset.feedback)
    if (e.target.dataset.feedback.status == 0){
      var param = {
        id: e.target.dataset.feedback.id,
        status: 1,
      }
      api.wxRequest.post('/feedback/status', param, res => {
        if (res.code == 200) {
          wx.navigateTo({
            url: '/pages/feedback/feedback?feedback=' + JSON.stringify(e.target.dataset.feedback),
          })
        } else {
          console.log(res.msg)
        }
      }, err => {
        console.log(err)
      })
    } else {
      wx.navigateTo({
        url: '/pages/feedback/feedback?feedback=' + JSON.stringify(e.target.dataset.feedback),
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options:',options.status)
    if (options.status == undefined){
      this.getFeedback(0)
    } else {
      this.getFeedback(options.status)
    }
  },

  //获取反馈列表
  getFeedback(status){
    var param = {
      status: status
    }
    api.wxRequest.get('/feedback', param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.forEach(function (item, index) {
          item.time = item.created_at.split(' ')[0]
        })
        this.setData({
          feedback: res.data
        })
        // console.log(this.data.question)
      } else if (res.code == 500) {
        this.setData({
          feedback: []
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    console.log('type:',currPage.__data__.type);
    if (currPage.__data__.type == 'accept') {
      this.onLoad({ status: currPage.__data__.status});
    }
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
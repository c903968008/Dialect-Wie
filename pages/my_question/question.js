// pages/question/question.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: []
  },

  edit(e){
    // console.log(e)
    wx.navigateTo({
      url: '/pages/set_question/set_question?type=edit&id=' + e.target.dataset.id,
    })
  },

  //播放
  play(e) {
    var index = e.target.dataset.index
    var data = 'question['+index+'].audioAction'
    var id = e.target.dataset.id
    var audioID = 'audio' + id
    this.audioCtx = wx.createAudioContext(audioID)
    this.audioCtx.play()
    this.setData({
      [data]: false
    })
  },

  //暂停
  pause(e) {
    var index = e.target.dataset.index
    var data = 'question[' + index + '].audioAction'
    var id = e.target.dataset.id
    var audioID = 'audio' + id
    this.audioCtx = wx.createAudioContext(audioID)
    this.audioCtx.pause()
    this.setData({
      [data]: true
    })
  },

  //播放结束
  end(e) {
    var index = e.target.dataset.index
    var data = 'question[' + index + '].audioAction'
    this.setData({
      [data]: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.wxRequest.get('/question/user/list', res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.forEach(function(item,index){
          item.audio = app.globalData.baseUrl + `/dialect/` + item.audio
          item.audioAction = true;
          item.wrongArr = item.wrong.split(',')
          item.audioID = 'audio' + item.id
          if(item.difficulty == 1){
            item.difficulty = '初级'
          } else if (item.difficulty == 2) {
            item.difficulty = '中级'
          } else if (item.difficulty == 3) {
            item.difficulty = '高级'
          }
        })
        this.setData({
          question: res.data
        })
        // console.log(this.data.question)
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    // console.log(currPage.__data__.type);
    if (currPage.__data__.type == 'edit'){
      this.onLoad();
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
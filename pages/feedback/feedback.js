// pages/feedback/feedback.js
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:{},
    feedback: {},
  },

  //接受
  accept() {
    var that = this
    var param = {
      id: this.data.feedback.id,
      dialect_id: this.data.question.dialect_id,
      translation: this.data.feedback.translation
    }
    api.wxRequest.post('/feedback/accept', param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          success: function (res) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];//上一个页面
            //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
            prevPage.setData({
              type: 'accept',
              status: that.data.feedback.status
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          },
        })
      } else {
        console.log(res.msg)
      }
    }, err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      feedback: JSON.parse(options.feedback)
    })
    // console.log(this.data.feedback)
    var param = {
      id: this.data.feedback.question_id,
    }
    api.wxRequest.get('/question/show', param, res => {
      if (res.code == 200) {
        console.log(res.data)
        res.data.wrongArr = res.data.wrong.split(',')
        res.data.audio = app.globalData.baseUrl + `/dialect/` + res.data.audio
        res.data.audioAction = true;
        if(res.data.difficulty == 1){
          res.data.diff = '初级'
        } else if (res.data.difficulty == 2) {
          res.data.diff = '中级'
        } else {
          res.data.diff = '高级'
        }
        this.setData({
          question: res.data
        })
      } else {
        console.log(res.msg)
      }
    }, err => {
      console.log(err)
    })
  },

  //播放
  play(e) {
    var data = 'question.audioAction'
    this.audioCtx.play()
    this.setData({
      [data]: false
    })
  },

  //暂停
  pause(e) {
    var data = 'question.audioAction'
    this.audioCtx.pause()
    this.setData({
      [data]: true
    })
  },

  //播放结束
  end(e) {
    var data = 'question.audioAction'
    this.setData({
      [data]: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('audio')
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
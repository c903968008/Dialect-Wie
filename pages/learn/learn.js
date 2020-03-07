// pages/learn/learn.js
const app = getApp();
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialect: [],
    gridCol: 3,
    search: {
      translation: ''
    },
    district_id: 0,
  },

  //搜索内容
  getSearchValue(e) {
    // console.log(e.detail)
    this.setData({
      search: {
        translation: e.detail.value
      }
    })
    // console.log('search:',this.data.search)
  },

  //搜索
  search(e){
    var param = {
      district_id: this.data.district_id,
      search: this.data.search
    }
    api.wxRequest.get('/dialect/learn', param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.forEach(function (item, index) {
          item.audio = app.globalData.baseUrl + `/dialect/` + item.audio
          item.audioAction = true;
          item.audioID = 'audio' + item.id
        })
        this.setData({
          dialect: res.data
        })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.district_id = 1
    this.setData({
      district_id: options.district_id
    })
    var param = {
      district_id: options.district_id
    }
    api.wxRequest.get('/dialect/learn',param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.forEach(function (item, index) {
          item.audio = app.globalData.baseUrl + `/dialect/` + item.audio
          item.audioAction = true;
          item.audioID = 'audio' + item.id
        })
        this.setData({
          dialect: res.data
        })
      } else if (res.code == 500) {
        console.log(res.msg)
      } else {
        console.log(res.errMsg)
      }
    }, err => {
      console.log(err)
    })

  },

  //播放
  play(e) {
    var index = e.target.dataset.index
    var data = 'dialect[' + index + '].audioAction'
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
    var data = 'dialect[' + index + '].audioAction'
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
    var data = 'dialect[' + index + '].audioAction'
    this.setData({
      [data]: true
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
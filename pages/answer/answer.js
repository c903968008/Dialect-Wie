// pages/answer/answer.js
const app = getApp();
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    chars: ['A','B','C','D'],
    isGood: 'gray',
    hidden: true,
    list: [],
    question: {},
    index: 0,
    right: 0,
    right_ids: [],
    total_ids: [],
    length: 0,
    district_id: 0,
    answered: false,
    feedback: {
      content: '',
      translation: '',
    }
  },

  contentInput(e) {
    let temp = 'feedback.content'
    this.setData({
      [temp]: e.detail.value
    })
  },
  translationInput(e) {
    let temp = 'feedback.translation'
    this.setData({
      [temp]: e.detail.value
    })
  },

  //反馈提交
  feedbackSubmit(e) {
    console.log(this.data.feedback)
    let param = {
      question_id: this.data.question.id,
      content: this.data.feedback.content,
      translation: this.data.feedback.translation
    }
    api.wxRequest.post('/feedback/create', param, res => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1500,
        })
        this.setData({
          hidden: true
        })
      } else {
        console.log(res.msg)
      }
    }, err => {
      console.log(err)
    })
    
  },

  //反馈
  feedback() {
    if(this.data.hidden){
      this.setData({
        hidden: false
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },

  //点赞
  good() {
    if(this.data.isGood == 'gray'){   //点赞
      var param = {
        id: this.data.question.id,
        status: true
      }
      this.setData({
        isGood: 'green'
      })
    } else{       //取消点赞
      var param = {
        id: this.data.question.id,
        status: false
      }
      this.setData({
        isGood: 'gray'
      })
    }
    api.wxRequest.post('/question/good', param, res => {
      if (res.code == 200) {

      } else {
        console.log(res.msg)
      }
    }, err => {
      console.log(err)
    })
  } ,

  //答题情况（弹框）
  showAnswer(e) {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  //答题
  answer(e){
    // console.log(e.target.dataset.result)
    // console.log(this.data.question)
    var right = this.data.right
    var right_ids = this.data.right_ids
    var total_ids = this.data.total_ids
    if (this.data.count == 0) {
      var index = e.target.dataset.index
      var result = e.target.dataset.result
      var question = this.data.question
      total_ids.push(question.id)
      var data = 'question.options[' + index + '].color'
      if (result == question.dialect.translation) {
        // console.log('答对')
        right_ids.push(question.id)
        this.setData({
          [data]: 'green',
          right: right+1,
          right_ids: right_ids,
          total_ids: total_ids
        })
      } else {
        // console.log('答错')
        this.setData({
          [data]: 'red'
        })
      }
      console.log('right:',this.data.right_ids)
      console.log('total:',this.data.total_ids)
      this.setData({
        count: 1,
        answered: true
      })
    }
  },

  //下一题 
  next(){
    var list = this.data.list
    var index = this.data.index
    this.setData({
      question: list[index+1],      
      index: index + 1,
      count: 0,
      answered: false,
      isGood: 'gray',
      hidden: true
    })
  },

  //完成
  complete(){
    var param = {
      district_id: this.data.district_id,
      right: this.data.right, 
      right_ids: this.data.right_ids,
      total_ids: this.data.total_ids
    }
    api.wxRequest.post('/question/answer', param, res => {
      if (res.code == 200){
        this.setData({
          modalName: 'Modal'
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
    options.district_id = 1
    var that = this
    this.setData({
      district_id: options.district_id
    })
    var param = {
      district_id: options.district_id
    }
    api.wxRequest.get('/question/answer/list', param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.forEach(function(item,index){
          item.audio = app.globalData.baseUrl + `/dialect/` + item.audio
          item.audioAction = true;
          item.wrongArr = item.wrong.split(',')
          item.result = 0   //0:未答题
          if (item.difficulty == 1) {
            item.difficulty = '初级'
          } else if (item.difficulty == 2) {
            item.difficulty = '中级'
          } else if (item.difficulty == 3) {
            item.difficulty = '高级'
          }
        })
        // console.log(res.data.length)
        this.setData({
          list: res.data,
          question: res.data[that.data.index],
          length: res.data.length,
        })
        // console.log(this.data.list)
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
    var data = 'question.audioAction'
    var id = e.target.dataset.id
    this.audioCtx = wx.createAudioContext('myaudio')
    this.audioCtx.play()
    this.setData({
      [data]: false
    })
  },

  //暂停
  pause(e) {
    var data = 'question.audioAction'
    var id = e.target.dataset.id
    this.audioCtx = wx.createAudioContext('myaudio')
    this.audioCtx.pause()
    this.setData({
      [data]: true
    })
  },

  //播放结束
  end(e) {
    var index = e.target.dataset.index
    var data = 'question.audioAction'
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
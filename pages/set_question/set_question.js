// pages/set_question/set_question.js
const recorderManager = wx.getRecorderManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    difficult: ['初级','中级','高级'],
    recordStatus: '按住录音'
  },

  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  //录音点击
  recordTouchStart:  function (e)  {
    this.startTime  =  e.timeStamp;
    //console.log(" startTime = " + e.timeStamp); 
    this.setData({
      recordStatus: '松开结束录音'
    })
  },

  //录音松开
  recordTouchEnd:  function (e)  {
    this.endTime  =  e.timeStamp;
    //console.log(" endTime = " + e.timeStamp); 
    // console.log("endTime - startTime = "  +  (this.endTime  -  this.startTime)); 
    this.setData({
      recordStatus: '按住录音'
    })
    recorderManager.onStop(res => {
      console.log('stop')
      console.log(res);
    });
    recorderManager.stop()//结束录音

    
  },

  //录音长按
  recordLongPress:  function (e)  {
    //设置录音参数
    const options = {
      duration: 10000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'mp3'
    }
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    //开始录音
    recorderManager.start(options);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
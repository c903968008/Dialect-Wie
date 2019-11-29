// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: [{
      dialect: "你好",
      difficult: "初级",
      district: "四川",
      wrong: ["吃饭","睡觉","打痘痘"]
    }, {
        dialect: "你好",
        difficult: "初级",
        district: "四川",
        wrong: ["吃饭", "睡觉", "打痘痘"]
      }, {
        dialect: "你好",
        difficult: "初级",
        district: "四川",
        wrong: ["吃饭", "睡觉", "打痘痘"]
      }, {
        dialect: "你好",
        difficult: "初级",
        district: "四川",
        wrong: ["吃饭", "睡觉", "打痘痘"]
      }]
  },

  edit(){
    wx.navigateTo({
      url: '/pages/set_question/set_question',
    })
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
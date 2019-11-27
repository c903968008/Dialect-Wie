// pages/select_district/select_district.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //搜索
  search(e) {

  },

  select(e) {
    let id = e.target.dataset;
    console.log(e.target.dataset)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      district: [
        [{ id: 1, name: 'aa' }, { id: 2, name: 'ab' }],
        [{ id: 3, name: 'bb' }, { id: 4, name: 'ba' }],
      ],
      hidden: [true,true,false,false]
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
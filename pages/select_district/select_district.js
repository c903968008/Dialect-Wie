// pages/select_district/select_district.js
const app = getApp();
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    district: [],
    type: '',
    search: '',
  },

  //搜索内容
  getSearchValue(e){
    // console.log(e.detail)
    this.setData({
      search: e.detail.value
    })
    // console.log('search:',this.data.search)
  },

  //搜索
  search(e) {
    // console.log('1111:', this.data.search)
    var param = {
      search: {
        name: this.data.search
      }
    }

    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    var keys = []
    api.wxRequest.get('/district/list',param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        for (let i in res.data) {
          if (res.data.hasOwnProperty(i)) {
            keys.push(i)
          }
        }
        console.log(keys)
        let ll = list.filter(function (val) { return keys.indexOf(val) > -1 })
        console.log(ll)
        this.setData({
          district: res.data,
          list: ll
        })
        // console.log(this.data)
      } else if (res.code == 500) {
        console.log(res.msg)
      } else {
        console.log(res.errMsg)
      }
    }, err => {
      console.log(err)
    })
  },

  //点击地址跳转
  select(e) {
    let id = e.target.dataset.index;
    // console.log(e.target.dataset)
    if(this.data.type == 'answer'){
      wx.navigateTo({
        url: '/pages/answer/answer',
      })
    } else if (this.data.type == 'learn'){
      wx.navigateTo({
        url: '/pages/learn/learn',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    // console.log(options.type)
    this.setData({
      type: options.type
    })
    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    // this.getList({})
    var keys = []
    api.wxRequest.get('/district/list', res => {
      if (res.code == 200) {
        // console.log(res.data)
        for (let i in res.data){
          if (res.data.hasOwnProperty(i)){
            keys.push(i)
          }
        }
        console.log(keys)
        let ll = list.filter(function (val) { return keys.indexOf(val) > -1 })
        console.log(ll)
        this.setData({
          district: res.data,
          list: ll
        })
        // console.log(this.data)
      } else if (res.code == 500) {
        console.log(res.msg)
      } else {
        console.log(res.errMsg)
      }
    }, err => {
      console.log(err)
    })

    // console.log('list:',list)
    // console.log('district:',this.data.district)
    
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
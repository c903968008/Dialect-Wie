// pages/set_question/set_question.js
const recorderManager = wx.getRecorderManager();
const app = getApp()
import api from '../../utils/wxRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    provinceIndex: 0,
    provincePicker: [],
    cityIndex: 0,
    cityPicker: [],
    difficult: [{
      name: '初级',
      color: 'green'
    }, {
      name: '中级',
      color: 'black'
    }, {
      name: '高级',
      color: 'black'
    }],
    recordStatus: '按住录音',
    temp:{
      province: 0,
      city: 0,
      difficulty: 0,
      right: '',
      wrong1: '',
      wrong2: '',
      wrong3: ''
    },
    tempFilePath:''
  },

  formSubmit: function(e) {
    // console.log(this.data.temp)
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    var temp = this.data.temp
    var value = e.detail.value
    var district_id = 0
    if (temp.city == 0){
      district_id = temp.province
    } else {
      district_id = temp.city
    }
    var wrong = value.wrong1 + ',' + value.wrong2 + ',' + value.wrong3
    
    if (value.dialect == '' || value.wrong1 == '' || value.wrong2 == '' || value.wrong3 == ''){
      wx.showToast({
        title: '四个选项必填',
        icon: 'none',
        duration: 2000,
      })
    } else {
      if (that.data.type == 'create'){
        var param = {
          district_id: district_id,
          difficulty: temp.difficulty,
          dialect: value.dialect,
          wrong: wrong
        }
        api.wxRequest.post('/question/create', param, res => {
          if (res.code == 200) {
            // console.log(res)
            var id = res.data.id
            var dialect_id = res.data.dialect_id
            that.uploadAudio(id, dialect_id)
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                setTimeout(function(){
                  wx.redirectTo({
                    url: '/pages/home/home',
                  });
                },2000)
              },
            })
          } else {
            console.log(res.msg)
          }
        }, err => {
          console.log(err)
        })
      } else if (that.data.type == 'edit'){
        var param = {
          id: that.data.id,
          district_id: district_id,
          difficulty: temp.difficulty,
          dialect: value.dialect,
          wrong: wrong
        }
        api.wxRequest.post('/question/edit', param, res => {
          if (res.code == 200) {
            // console.log(res)
            var id = res.data.id
            var dialect_id = res.data.dialect_id
            that.uploadAudio(id, dialect_id)
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];//上一个页面
                //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                  type: 'edit'
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              },
            })
          } else {
            console.log(res.msg)
          }
        }, err => {
          console.log(err)
        })
      }
    }

  },

  //上传录音
  uploadAudio(id, dialect_id){
    var that = this
    var token = wx.getStorageSync('token')
    if (that.data.tempFilePath != ''){
      wx.uploadFile({
        url: app.globalData.baseUrl + '/question/audio/upload',
        filePath: that.data.tempFilePath,
        name: 'audio',
        header: {
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer ' + token
        },
        formData: {
          id: id,
          dialect_id: dialect_id,
        },
        success: function (res) {
          // console.log(res)
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '请录音',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function (res) { console.log(res) },
      })
    }
  },
  
  //选择省、获取市
  provinceChange(e) {
    var temp = 'temp.province'
    var index = e.detail.value
    var id = this.data.provincePicker[index].id
    this.setData({
      provinceIndex: index,
      [temp]: id
    })
    // console.log(this.data.temp)
    this.getCity(id)
  },

  //选择市
  cityChange(e) {
    var temp = 'temp.city'
    var index = e.detail.value
    var id = this.data.cityPicker[index].id
    this.setData({
      cityIndex: index,
      [temp]: id
    })
  },

  //选择难度
  diff: function(e) {
    var index = e.target.dataset.index
    var diff = this.data.difficult
    diff[index].color = 'green'
    var arr1 = [index];
    var arr2 = [0,1,2];
    var arr = arr1.concat(arr2).filter(function (v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    });
    for(let i=0;i<arr.length;i++){
      diff[arr[i]].color = 'black'
    }
    var temp = 'temp.difficulty'
    this.setData({
      difficult: diff,
      [temp]: index + 1
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
    var that = this
    this.endTime  =  e.timeStamp;
    //console.log(" endTime = " + e.timeStamp); 
    // console.log("endTime - startTime = "  +  (this.endTime  -  this.startTime)); 
    this.setData({
      recordStatus: '按住录音'
    })
    recorderManager.onStop(res => {
      // console.log('stop')
      // console.log(res);
      // const { tempFilePath } = res;
      // console.log('song',tempFilePath)
      that.setData({
        tempFilePath: res.tempFilePath
      })
      // console.log(that.data.tempFilePath)
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
      // console.log('recorder start')
    })
    //开始录音
    recorderManager.start(options);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProvince()
    this.setData({
      type: options.type,
      id: options.id
    })
    if(options.type == 'edit') {
      //id信息
      this.getById(options.id)
    }
  },

  //根据id查信息
  getById(id) {
    var that = this
    let param = {
      id: id 
    }
    api.wxRequest.get('/question/show', param, res => {
      if (res.code == 200) {
        console.log(res.data)
        var temp = {
          province: 0,
          city: 0,
          difficulty: 0,
          right: '',
          wrong1: '',
          wrong2: '',
          wrong3: ''
        }
        var provinceIndex = 0
        if(res.data.district.p_id == 0){
          provinceIndex = this.findArray(this.data.provincePicker, { id: res.data.district_id })
          temp.province = res.data.district_id
        } else {
          provinceIndex = this.findArray(this.data.provincePicker, { id: res.data.district.p_id })
          this.getCitySearch(res.data.district.p_id, res.data.district_id)
          temp.province = res.data.district.p_id
          temp.city = res.data.district_id
        }
        temp.right = res.data.dialect.translation
        var wrongArr = res.data.wrong.split(',')
        temp.wrong1 = wrongArr[0]
        temp.wrong2 = wrongArr[1]
        temp.wrong3 = wrongArr[2]

        temp.difficulty = res.data.difficulty
        var diff = this.data.difficult
        diff[res.data.difficulty-1].color = 'green'
        var arr1 = [res.data.difficulty - 1];
        var arr2 = [0, 1, 2];
        var arr = arr1.concat(arr2).filter(function (v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        });
        for (let i = 0; i < arr.length; i++) {
          diff[arr[i]].color = 'black'
        }

        this.setData({
          difficult: diff,
          provinceIndex: provinceIndex,
          temp: temp,
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

  findArray(array, feature, all = true) {
    for (let index in array) {
      let cur = array[index];
      if (feature instanceof Object) {
        let allRight = true;
        for (let key in feature) {
          let value = feature[key];
          if (cur[key] == value && !all) return index;
          if (all && cur[key] != value) {
            allRight = false;
            break;
          }
        }
        if (allRight) return index;
      } else {
        if (cur == feature) {
          return index;
        }
      }
    }
    return -1;
  },

  //获取一级地区
  getProvince(){
    let param = {
      p_id: 0
    }
    api.wxRequest.get('/district/plist', param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        this.setData({
          provincePicker: res.data
        })
        // console.log(this.data.provincePicker)
      } else if (res.code == 500) {
        console.log(res.msg)
      } else {
        console.log(res.errMsg)
      }
    }, err => {
      console.log(err)
    })
  },

  //获取二级地区
  getCity(p_id) {
    var that = this
    let param = {
      p_id: p_id
    }
    api.wxRequest.get('/district/plist', param, res => {
      if (res.code == 200) {
        console.log(res.data)
        res.data.unshift({
          name: '未选择'
        })
        that.setData({
          cityPicker: res.data
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

  getCitySearch(p_id,district_id) {
    var that = this
    var index = 0
    let param = {
      p_id: p_id
    }
    api.wxRequest.get('/district/plist', param, res => {
      if (res.code == 200) {
        // console.log(res.data)
        res.data.unshift({
          name: '未选择'
        })
        index = this.findArray(res.data,{id:district_id})
        that.setData({
          cityPicker: res.data,
          cityIndex: index
        })
        // console.log('index:',index)
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
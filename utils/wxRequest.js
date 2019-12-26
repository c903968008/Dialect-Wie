const baseUrl = 'http://8.8.8.3:8089';

var token = '';

wx.getStorage({
  key: 'token',
  success(res) {
    // console.log(res.data)
    token = res.data
    // console.log(token)
  }
});

const wxRequest =  {
  /**
   * url = String 请求地址
   * obj = Object 请求参数
   * success = function 成功回调
   * fail = function 成功回调
   */
  get: (url, data, success, fail) => {
    if ((typeof data) == 'function') {
      if (success && (typeof success) == 'function') {
        fail = success;
      }
      success = data;
      data = '';
      // console.log(success, data, fail)
    }
    wx.request({
      url: baseUrl + url,
      data: data || '',
      header: {
        'Authorization': 'Bearer ' + token
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success(res) {
        if (success) {
          success(res.data);
        }
      },
      fail(res) {
        if (fail) {
          fail(res);
        }
        wx.hideLoading();
        wx.showToast({
          title: '请求超时',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  post: (url, data, success, fail) => {
    if ((typeof data) == 'function') {
      if (success && (typeof success) == 'function') {
        fail = success;
      }
      success = data;
      data = '';
      // console.log(success, data, fail)
    }
    wx.request({
      url: baseUrl + url,
      data: data || '',
      header: {
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success(res) {
        if (success) {
          success(res.data);
        }
      },
      fail(res) {
        if (fail) {
          fail(res);
        }
        wx.hideLoading();
        wx.showToast({
          title: '请求超时',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
}


module.exports = {
  wxRequest: wxRequest
}

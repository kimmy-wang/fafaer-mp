// pages/welcome/welcome.js
import {
  getBannerList
} from '../../models/welcome.js'

import {
  handleError
} from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    loadingCenter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._showLoadingCenter()
    getBannerList()
      .then(res => {
        this.setData({
          banners: res
        })
        this._hideLoadingCenter()
      }).catch(error => {
        this._hideLoadingCenter()
        handleError(error)
      })
  },

  onItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset
    const { banners } = this.data
    if ((index + 1) === banners.length) {
      wx.switchTab({
        url: '/pages/new/new',
      })
    }
  },

  _showLoadingCenter() {
    this.setData({
      loadingCenter: true
    })
  },

  _hideLoadingCenter() {
    this.setData({
      loadingCenter: false
    })
  }
})
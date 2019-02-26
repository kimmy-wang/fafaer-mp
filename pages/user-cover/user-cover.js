// pages/user-cover/user-cover.js
import {
  getBannerList
} from '../../models/welcome.js'

import {
  handleError
} from '../../utils/common.js'

import {
  getValidDataFromCache,
  setValidDataFromCache
} from "../../utils/cache.js";

import {
  WELCOME_CACHE_DATA
} from "../../utils/constants.js";

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
  onLoad: function (options) {
    let banners = getValidDataFromCache(WELCOME_CACHE_DATA)
    !banners && function() {
      this._showLoadingCenter()
      getBannerList()
          .then(res => {
            this.setData({
              banners: res
            })
            setValidDataFromCache(WELCOME_CACHE_DATA, res)
            this._hideLoadingCenter()
          })
          .catch(error => {
            this._hideLoadingCenter()
            handleError(error)
          })
    }.bind(this)()
    banners && function() {
      this.setData({
        banners
      })
    }.bind(this)()
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

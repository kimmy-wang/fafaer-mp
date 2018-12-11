// pages/new/new.js
import {
  getArticles
} from '../../models/new.js'

import {
  random
} from '../../utils/common.js'

import {
  Pagination
} from '../../models/Pagination.js'

const pagination = new Pagination()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray: [],
    searching: false,
    more: '',
    total: 0,
    noneResult: false,
    loading: false,
    loading_center: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._showLoadingCenter()
    getArticles(1, pagination.getPageSize()).then(res => {
      // console.log(res)
      this._setMoreData(res.results)
      this._setTotal(res.count)
      this._hideLoadingCenter()
    }).catch(error => {
      this._hideLoadingCenter()
    })
  },
  
  onSearching() {
    this.setData({
      searching: true
    })
  },

  onCancelSearch() {
    this.setData({
      searching: false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    // console.log(e)
    const more = random(16)
    this.setData({
      more
    })

    if (this._getLoading()) {
      return
    }

    if (!this._hasMoreData()) {
      wx.showToast({
        title: '没有数据啦',
        icon: 'none'
      })
      return
    }

    this._setLoading(true)
    getArticles(pagination.getNextPage(), pagination.getPageSize()).then(res => {
      // console.log(res)
      this._setMoreData(res.results)
      this._setLoading(false)
    }).catch(error => {
      this._setLoading(false)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  _setMoreData(dataArray) {
    const tempArray = this.data.dataArray.concat(dataArray)
    this.setData({
      dataArray: tempArray
    })
  },

  _setTotal(total) {
    this.setData({
      total,
      noneResult: total === 0
    })
  },

  _hasMoreData() {
    return !(this.data.dataArray.length >= this.data.total)
  },

  _getLoading(loading) {
    return this.data.loading
  },

  _setLoading(loading) {
    this.setData({
      loading
    })
  },

  _showLoadingCenter() {
    this.setData({
      loading_center: true
    })
  },

  _hideLoadingCenter() {
    this.setData({
      loading_center: false
    })
  }
})
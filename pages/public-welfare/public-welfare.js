// pages/public-welfare/public-welfare.js
import {
  getLostList
} from '../../models/public-welfare.js'

import {
  random,
  handleError
} from '../../utils/common.js'

import {
  getShowConfirmOnce,
  setShowConfirmOnce
} from '../../utils/more.js'

import {
  HISTORY_SEARCH_PUBLIC_WELFARE,
  MORE_PUBLIC_WELFARE,
  MORE_SHOW_PUBLIC_WELFARE_ONCE,

  PAGE_SIZE
} from '../../utils/constants.js'

import {
  Pagination
} from '../../models/Pagination.js'

import {
  getCacheNum
} from '../../utils/more.js'

const pagination = new Pagination()
const pageSize = getCacheNum(MORE_PUBLIC_WELFARE)
pagination.setPageSize(pageSize)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      searchDataArray: [],
      searching: false
    },
    dataArray: [],
    searching: false,
    more: '',
    total: 0,
    noneResult: false,
    loading: false,
    loadingCenter: false,
    searchUrl: 'public_welfare/lost/?',
    historySearchType: HISTORY_SEARCH_PUBLIC_WELFARE
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._showLoadingCenter()
    getLostList(1, pagination.getPageSize()).then(res => {
      this._setMoreData(res.results)
      this._setTotal(res.count)
      this._hideLoadingCenter()
    }).catch(error => {
      this._hideLoadingCenter()
      handleError(error)
    })

    const showConfirmOnce = getShowConfirmOnce(MORE_SHOW_PUBLIC_WELFARE_ONCE) 
    !showConfirmOnce && wx.showModal({
      title: "提示",
      content: "每个人都是走失孩子回家路上的一盏灯, 汇聚成为连接孩子与父母间的光明大道",
      showCancel: false,
      confirmText: "赞👍",
      success(res) {
        if (res.confirm) {
          setShowConfirmOnce(MORE_SHOW_PUBLIC_WELFARE_ONCE)
        }
      }
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
    this.onClearSearch()
  },

  onClearSearch() {
    this.setData({
      search: {
        searchDataArray: [],
        searching: false
      }
    })
  },

  showDetail(e) {
    const {
      id
    } = e.detail
    wx.navigateTo({
      url: `/pages/public-welfare-detail/public-welfare-detail?id=${id}`,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    const {
      searching
    } = this.data
    if (searching) {
      wx.stopPullDownRefresh()
      return
    }
    const pageSize = getCacheNum(MORE_PUBLIC_WELFARE)
    pagination.setPageSize(pageSize)
    wx.showNavigationBarLoading()
    getLostList(1, pagination.getPageSize()).then(res => {
      this._setRefreshData(res.results)
      this._setTotal(res.count)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }).catch(error => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      handleError(error)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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
    getLostList(pagination.getNextPage(), pagination.getPageSize()).then(res => {
      this._setMoreData(res.results)
      this._setLoading(false)
    }).catch(error => {
      this._setLoading(false)
      handleError(error)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  initSearchData(e) {
    this._loadSearchData(e)
  },

  updateSearchData(e) {
    this._loadSearchData(e)
  },

  _loadSearchData(e) {
    const {
      data,
      searching
    } = e.detail
    // console.log(data)
    const searchDataArray = this.data.search.searchDataArray.concat(data)
    this.setData({
      search: {
        searchDataArray,
        searching
      }
    })
  },

  _setRefreshData(dataArray) {
    this.setData({
      dataArray
    })
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
      loadingCenter: true
    })
  },

  _hideLoadingCenter() {
    this.setData({
      loadingCenter: false
    })
  }
})
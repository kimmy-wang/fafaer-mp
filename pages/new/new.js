// pages/new/new.js
import {
  getArticles
} from '../../models/new.js'

import {
  random,
  handleError
} from '../../utils/common.js'

import {
  randCeil,
} from '../../utils/ads.js'

import {
  Pagination
} from '../../models/Pagination.js'

import {
  HISTORY_SEARCH_ARTICLE,
  MORE_ARTICLE
} from '../../utils/constants.js'

import {
  getCacheNum
} from '../../utils/cache.js'

const pagination = new Pagination()
const pageSize = getCacheNum(MORE_ARTICLE)
pagination.setPageSize(pageSize)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      searchDataArray: [],
      searching: false,
      searchAds: 0,
    },
    dataArray: [],
    searching: false,
    more: '',
    total: 0,
    noneResult: false,
    loading: false,
    loadingCenter: false,
    searchUrl: 'news/articles?',
    historySearchType: HISTORY_SEARCH_ARTICLE,

    ads: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._showLoadingCenter()
    getArticles(1, pagination.getPageSize()).then(res => {
      this._setMoreData(res.results)
      this._setTotal(res.count)
      this._hideLoadingCenter()
    }).catch(error => {
      this._hideLoadingCenter()
      handleError(error)
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
        searching: false,
        searchAds: 0
      }
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
    const pageSize = getCacheNum(MORE_ARTICLE)
    pagination.setPageSize(pageSize)
    wx.showNavigationBarLoading()
    getArticles(1, pagination.getPageSize()).then(res => {
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
  onReachBottom: function(e) {
    const { searching } = this.data
    const more = random(16)
    this.setData({
      more
    })

    // 针对搜索页面下拉刷新
    if (searching) {
      return
    }

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
      this._setMoreData(res.results)
      this._setLoading(false)
    }).catch(error => {
      this._setLoading(false)
      handleError(error)
    })
  },

  hideAd(e) {
    const { index } = e.target.dataset
    const { dataArray } = this.data
    let tempArray = dataArray.slice()
    tempArray[index] = {
      ...tempArray[index],
      type: 'none'
    }
    this.setData({
      dataArray: tempArray
    })
  },

  hideSearchAd(e) {
    const { index } = e.target.dataset
    const { search } = this.data
    const { searchDataArray } = search
    let tempArray = searchDataArray.slice()
    tempArray[index] = {
      ...tempArray[index],
      type: 'none'
    }
    this.setData({
      search: {
        ...search,
        searchDataArray: tempArray
      }
    })
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
    const { searchDataArray } = this.data.search
    let { searchAds } = this.data.search
    const tempArray = searchDataArray.concat(data)

    let tempAdArray = tempArray.slice()
    let index = randCeil(searchDataArray.length, tempArray.length)
    if (!searchDataArray.length && !index && data.length > 1) {
      ++index
    }
    tempAdArray.splice(index, 0, {
      type: 'ad'
    })
    ++searchAds

    this.setData({
      search: {
        searchDataArray: tempAdArray,
        searching,
        searchAds
      }
    })
  },

  _setRefreshData(dataArray) {
    let tempAdArray = dataArray.slice()
    let ads = 0
    if (dataArray.length > 1) {
      const index = randCeil(0, tempAdArray.length)
      tempAdArray.splice(index, 0, {
        type: 'ad'
      })
      ads = 1
    }
    this.setData({
      dataArray: tempAdArray,
      ads
    })
  },

  _setMoreData(data) {
    const {
      dataArray
    } = this.data
    let {
      ads
    } = this.data
    const tempArray = dataArray.concat(data)
    let tempAdArray = tempArray.slice()
    if (data.length > 1) {
      let index = randCeil(dataArray.length, tempArray.length)
      if (!dataArray.length && !index) {
        ++index
      }
      tempAdArray.splice(index, 0, {
        type: 'ad'
      })
      ++ads
    }

    this.setData({
      dataArray: tempAdArray,
      ads,
    })
  },

  _setTotal(total) {
    this.setData({
      total,
      noneResult: total === 0
    })
  },

  _hasMoreData() {
    const { dataArray, total, ads } = this.data
    return !((dataArray.length - ads) >= total)
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
// pages/new/new.js
import {
  getArticles
} from '../../models/new.js'

import {
  random,
  handleError
} from '../../utils/common.js'

import {
  Pagination
} from '../../models/Pagination.js'

import {
  HISTORY_SEARCH_ARTICLE,
  USER_ARTICLE
} from '../../utils/constants.js'

import {
  getCacheNum
} from '../../utils/cache.js'

import {
  baseBeh,
  pageAdBeh
} from '../behaviors/page-behaviors.js'

const pagination = new Pagination()
const pageSize = getCacheNum(USER_ARTICLE)
pagination.setPageSize(pageSize)

Component({
  behaviors: [baseBeh, pageAdBeh],

  /**
   * 页面的初始数据
   */
  data: {
    searchUrl: 'news/articles?',
    historySearchType: HISTORY_SEARCH_ARTICLE,
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // this._toggleTabBar()
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
      const pageSize = getCacheNum(USER_ARTICLE)
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
      // 针对搜索页面下拉刷新
      if (searching) {
        const more = random(16)
        this.setData({
          more
        })
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
  }
})

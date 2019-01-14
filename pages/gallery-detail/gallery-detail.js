// pages/photo/photo.js
import {
  getGalleryDetail
} from '../../models/gallery.js'

import {
  random,
  handleError
} from '../../utils/common.js'

import {
  Pagination
} from '../../models/Pagination.js'

import {
  HISTORY_SEARCH_GALLERY_PHOTO,
  MORE_PHOTO
} from '../../utils/constants.js'

import {
  getCacheNum
} from '../../utils/cache.js'

import {
  baseBeh,
  pageNotAdBeh
} from '../behaviors/page-behaviors.js';

const pagination = new Pagination()
const pageSize = getCacheNum(MORE_PHOTO)
pagination.setPageSize(pageSize)

Component({
  behaviors: [baseBeh, pageNotAdBeh],

  /**
   * 页面的初始数据
   */
  data: {
    searchUrl: '',
    galleryId: '',
    historySearchType: HISTORY_SEARCH_GALLERY_PHOTO
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      const { id, name } = options
      this.setData({
        searchUrl: `photos/detail?gallery_id=${id}&`,
        galleryId: id
      })
      this._showLoadingCenter()
      getGalleryDetail(id, pagination.getFirstPage(), pagination.getPageSize()).then(res => {
        wx.setNavigationBarTitle({
          title: name
        })

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
    onPullDownRefresh: function () {
      const { searching } = this.data
      if (searching) {
        wx.stopPullDownRefresh()
        return
      }
      const pageSize = getCacheNum(MORE_PHOTO)
      pagination.setPageSize(pageSize)
      const { galleryId } = this.data
      wx.showNavigationBarLoading()
      getGalleryDetail(galleryId, 1, pagination.getPageSize()).then(res => {
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
    onReachBottom: function () {
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
      getGalleryDetail(this.data.galleryId, pagination.getNextPage(), pagination.getPageSize()).then(res => {
        this._setMoreData(res.results)
        this._setLoading(false)
      }).catch(error => {
        this._setLoading(false)
        handleError(error)
      })
    },
  }
})
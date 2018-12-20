// pages/more/more.js
import {
  settings,
  cacheActions
} from '../../utils/more.js'

import {
  MORE_ARTICLE,
  MORE_MUSIC,
  MORE_VIDEO,
  MORE_PHOTO
} from '../../utils/constants.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings: settings,
    type: '',
    title: '',
    showConfirmWindow: false,
    articleNum: 5,
    musicNum: 5,
    videoNum: 5,
    photoNum: 5,
    articleCacheNum: 5,
    musicCacheNum: 5,
    videoCacheNum: 5,
    photoCacheNum: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const articleNum = wx.getStorageSync(MORE_ARTICLE) || 5
    const musicNum = wx.getStorageSync(MORE_MUSIC) || 5
    const videoNum = wx.getStorageSync(MORE_VIDEO) || 5
    const photoNum = wx.getStorageSync(MORE_PHOTO) || 5
    this.setData({
      articleNum,
      musicNum,
      videoNum,
      photoNum
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onItemClick(e) {
    const { type, title } = e.detail
    this._showConfirmWindow()
    this.setData({
      type,
      title
    })
  },

  onMaskClick() {
    this._hideConfirmWindow()
  },

  onCancel() {
    this._hideConfirmWindow()
  },

  onConfirm() {
    this._hideConfirmWindow()
    this._onConfirm()
    // const { type } = this.data
    // cacheActions[type](this, type);
  },

  onChange(e) {
    const { value } = e.detail
    const { type } = this.data
    switch (type) {
      case MORE_ARTICLE:
        this.setData({
          articleCacheNum: value
        })
        break
      case MORE_MUSIC:
        this.setData({
          musicCacheNum: value
        })
        break
      case MORE_VIDEO:
        this.setData({
          videoCacheNum: value
        })
        break
      case MORE_PHOTO:
        this.setData({
          photoCacheNum: value
        })
        break
      default:
        return
    }
  },

  _showConfirmWindow() {
    this.setData({
      showConfirmWindow: true
    })
  },

  _hideConfirmWindow() {
    this.setData({
      showConfirmWindow: false
    })
  },

  _onConfirm() {
    const { type, articleCacheNum, musicCacheNum, videoCacheNum, photoCacheNum } = this.data
    switch (type) {
      case MORE_ARTICLE:
        this.setData({
          articleNum: articleCacheNum
        })
        wx.setStorageSync(MORE_ARTICLE, articleCacheNum)
        break
      case MORE_MUSIC:
        this.setData({
          musicNum: musicCacheNum
        })
        wx.setStorageSync(MORE_MUSIC, musicCacheNum)
        break
      case MORE_VIDEO:
        this.setData({
          videoNum: videoCacheNum
        })
        wx.setStorageSync(MORE_VIDEO, videoCacheNum)
        break
      case MORE_PHOTO:
        this.setData({
          photoNum: photoCacheNum
        })
        wx.setStorageSync(MORE_PHOTO, photoCacheNum)
        break
      default:
        return
    }
  }
})
// pages/more/more.js
import {
  settings,
  cacheActions,
  getCacheNum,
  setCacheNum,

  getShowConfirmOnce,
  setShowConfirmOnce
} from '../../utils/more.js'

import {
  MORE_ARTICLE,
  MORE_MUSIC,
  MORE_VIDEO,
  MORE_PHOTO,
  MORE_ADMIRATION,
  MORE_ABOUT
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
  onLoad: function(options) {
    const articleNum = getCacheNum(MORE_ARTICLE)
    const musicNum = getCacheNum(MORE_MUSIC)
    const videoNum = getCacheNum(MORE_VIDEO)
    const photoNum = getCacheNum(MORE_PHOTO)
    this.setData({
      articleNum,
      musicNum,
      videoNum,
      photoNum
    })

    const showConfirmOnce = getShowConfirmOnce()
    !showConfirmOnce && wx.showModal({
      title: "提示",
      content: "分页设置: 每页加载数量",
      showCancel: false,
      confirmText: "朕已阅",
      success(res) {
        if (res.confirm) {
          setShowConfirmOnce()
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onItemClick(e) {
    const {
      type,
      title
    } = e.detail
    if (type === MORE_ADMIRATION) {
      wx.previewImage({
        urls: ['https://dev.cdn.chenyifaer.com/admiration.png']
      })
      return
    }

    if (type === MORE_ABOUT) {
      wx.showToast({
        title: '别点了, 啥也没有',
        icon: 'none'
      })
      return
    }

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
    const {
      value
    } = e.detail
    const {
      type
    } = this.data
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
    const {
      type,
      articleCacheNum,
      musicCacheNum,
      videoCacheNum,
      photoCacheNum
    } = this.data
    switch (type) {
      case MORE_ARTICLE:
        this.setData({
          articleNum: articleCacheNum
        })
        setCacheNum(MORE_ARTICLE, articleCacheNum)
        break
      case MORE_MUSIC:
        this.setData({
          musicNum: musicCacheNum
        })
        setCacheNum(MORE_MUSIC, musicCacheNum)
        break
      case MORE_VIDEO:
        this.setData({
          videoNum: videoCacheNum
        })
        setCacheNum(MORE_VIDEO, videoCacheNum)
        break
      case MORE_PHOTO:
        this.setData({
          photoNum: photoCacheNum
        })
        setCacheNum(MORE_PHOTO, photoCacheNum)
        break
      default:
        return
    }
  }
})
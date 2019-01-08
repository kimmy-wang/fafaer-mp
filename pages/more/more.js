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
  MORE_PUBLIC_WELFARE,
  MORE_ABOUT,
  MORE_SHOW_CONFIRM_ONCE,

  PAGE_SIZE
} from '../../utils/constants.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings: settings,
    type: '',
    title: '',
    min: PAGE_SIZE,
    max: 20,
    showConfirmWindow: false,
    articleNum: PAGE_SIZE,
    musicNum: PAGE_SIZE,
    videoNum: PAGE_SIZE,
    photoNum: PAGE_SIZE,
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

    const showConfirmOnce = getShowConfirmOnce(MORE_SHOW_CONFIRM_ONCE)
    !showConfirmOnce && wx.showModal({
      title: "提示",
      content: "分页设置: 每页加载数量",
      showCancel: false,
      confirmText: "朕已阅",
      success(res) {
        if (res.confirm) {
          setShowConfirmOnce(MORE_SHOW_CONFIRM_ONCE)
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

    if (type === MORE_PUBLIC_WELFARE) {
      wx.navigateTo({
        url: '/pages/public-welfare/public-welfare',
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

    this.setData({
      type,
      title
    })

    this._showConfirmWindow()
  },

  onMaskClick() {
    this._hideConfirmWindow()
  },

  onCancel() {
    this._hideConfirmWindow()
  },

  onConfirm(e) {
    this._hideConfirmWindow()
    this._onConfirm(e)
    // const { type } = this.data
    // cacheActions[type](this, type);
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

  _onConfirm(e) {
    const {type, value} = e.detail
    setCacheNum(type, value)
    switch (type) {
      case MORE_ARTICLE:
        this.setData({
          articleNum: value
        })
        break
      case MORE_MUSIC:
        this.setData({
          musicNum: value
        })
        break
      case MORE_VIDEO:
        this.setData({
          videoNum: value
        })
        break
      case MORE_PHOTO:
        this.setData({
          photoNum: value
        })
        break
      default:
        return
    }
  }
})
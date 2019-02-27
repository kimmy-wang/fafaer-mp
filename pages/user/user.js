// pages/user/user.js
import {
  user_menus
} from '../../utils/user.js'

import {
  getCacheNum,
  setCacheNum,

  getShowConfirmOnce,
  setShowConfirmOnce
} from '../../utils/cache.js'

import {
  USER_ARTICLE,
  USER_MUSIC,
  USER_VIDEO,
  USER_PHOTO,
  USER_SETTINGS,
  USER_SHOW_CONFIRM_ONCE,

  PAGE_SIZE
} from '../../utils/constants.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: user_menus,
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
    const articleNum = getCacheNum(USER_ARTICLE)
    const musicNum = getCacheNum(USER_MUSIC)
    const videoNum = getCacheNum(USER_VIDEO)
    const photoNum = getCacheNum(USER_PHOTO)
    this.setData({
      articleNum,
      musicNum,
      videoNum,
      photoNum
    })

    // const showConfirmOnce = getShowConfirmOnce(MORE_SHOW_CONFIRM_ONCE)
    // !showConfirmOnce && wx.showModal({
    //   title: "提示",
    //   content: "分页设置: 每页加载数量",
    //   showCancel: false,
    //   confirmText: "朕已阅",
    //   success(res) {
    //     if (res.confirm) {
    //       setShowConfirmOnce(MORE_SHOW_CONFIRM_ONCE)
    //     }
    //   }
    // })
  },

  onItemClick(e) {
    const {
      type,
      title
    } = e.detail;

    if (type === USER_SETTINGS) {
      wx.navigateTo({
        url: '/pages/user-settings/user-settings',
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
      case USER_ARTICLE:
        this.setData({
          articleNum: value
        })
        break
      case USER_MUSIC:
        this.setData({
          musicNum: value
        })
        break
      case USER_VIDEO:
        this.setData({
          videoNum: value
        })
        break
      case USER_PHOTO:
        this.setData({
          photoNum: value
        })
        break
      default:
        return
    }
  }
})

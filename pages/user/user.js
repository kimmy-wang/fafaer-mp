// pages/user/user.js
import settings from '../../utils/user.js'

import versions from '../../versions.js'

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
  USER_ADMIRATION,
  USER_PUBLIC_WELFARE,
  USER_MINI_PROGRAM_COVER,
  USER_CLEAR_STORAGE,
  USER_FEED_BACK,
  USER_ABOUT,
  USER_SHOW_CONFIRM_ONCE,

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
    if (type === USER_ADMIRATION) {
      wx.showModal({
        title: '赞赏',
        content: '确定去赞赏页面吗?',
        success(res) {
          res.confirm && wx.previewImage({
            urls: ['https://dev.cdn.chenyifaer.com/admiration.png']
          })
        }
      })
      return
    }

    if (type === USER_PUBLIC_WELFARE) {
      wx.navigateTo({
        url: '/pages/user-public-welfare/user-public-welfare',
      })
      return
    }

    if (type === USER_MINI_PROGRAM_COVER) {
      wx.navigateTo({
        url: '/pages/user-cover/user-cover',
      })
      return
    }

    if (type === USER_CLEAR_STORAGE) {
      wx.showModal({
        title: '清除缓存',
        content: '确定清除缓存吗?',
        success(res) {
          res.confirm && wx.clearStorage({
            success() {
              wx.showToast({
                title: '清除成功',
                mask: true
              })
            },
            fail() {
              wx.showToast({
                title: '清除失败',
                icon: 'none',
                mask: true
              })
            }
          })
        }
      })
      return
    }

    if (type === USER_FEED_BACK) {
      return
    }

    if (type === USER_ABOUT) {
      wx.showModal({
        title: '版本',
        content: versions[0].version,
        cancelText: '更新记录',
        confirmText: '朕已阅',
        success(res) {
          !res.confirm && wx.navigateTo({
            url: '/pages/user-about/user-about'
          })
        }
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

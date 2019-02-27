// pages/user-settings/user-settings.js
import {
  user_settings_menus
} from '../../utils/user.js'

import versions from '../../versions.js'

import {
  USER_ADMIRATION,
  USER_PUBLIC_WELFARE,
  USER_MINI_PROGRAM_COVER,
  USER_CLEAR_STORAGE,
  USER_FEED_BACK,
  USER_ABOUT,
} from '../../utils/constants.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: user_settings_menus,
    showOfficialAccount: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onItemClick(e) {
    const {
      type,
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
  },

  hideOfficialAccount() {
    this.setData({
      showOfficialAccount: false
    })
  },

  onFeedBackButtonClick() {
    wx.vibrateLong()
  }

})

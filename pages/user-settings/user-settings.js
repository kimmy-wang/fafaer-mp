// pages/user-settings/user-settings.js
import {
  user_settings_menus
} from '../../utils/user.js'

import versions from '../../versions.js'

import {
  USER_ADMIRATION,
  USER_PUBLIC_WELFARE,
  USER_SHOW_AD,
  USER_MINI_PROGRAM_COVER,
  USER_CLEAR_STORAGE,
  USER_ABOUT,
} from '../../utils/constants.js'

import {
  getCacheValidHours,
  setCacheValidHours,

  getCacheShowAd,
  setCacheShowAd,
} from '../../utils/cache.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: user_settings_menus,
    showOfficialAccount: true,
    pickerIndex: 3,
    pickerArray: [1, 2, 3, 4, 5, 6],
    showAd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cacheHour = parseInt(getCacheValidHours())
    const { pickerArray } = this.data
    const index = pickerArray.indexOf(cacheHour)

    const cacheShowAd = getCacheShowAd()
    this.setData({
      pickerIndex: index,
      showAd: cacheShowAd === 'Y'
    })
  },

  onItemClick(e) {
    const {
      type,
    } = e.detail
    const {
      showAd
    } = this.data

    type === USER_ADMIRATION && wx.showModal({
      title: '赞赏',
      content: '确定去赞赏页面吗?',
      success(res) {
        res.confirm && wx.previewImage({
          urls: ['https://dev.cdn.chenyifaer.com/admiration.png']
        })
      }
    })

    type === USER_PUBLIC_WELFARE && wx.navigateTo({
      url: '/pages/user-public-welfare/user-public-welfare',
    })

    type === USER_SHOW_AD && wx.showModal({
      title: '提示',
      content: `确定${showAd?'关闭':'开启'}广告吗?`,
      confirmText: `${showAd?'关闭':'开启'}`,
      success: (res)=> {
        if (res.confirm) {
          this.setData({
            showAd: !showAd
          })
          setCacheShowAd((!showAd)? 'Y' : 'N')
        }
      }
    })

    type === USER_MINI_PROGRAM_COVER && wx.navigateTo({
      url: '/pages/user-cover/user-cover',
    })

    type === USER_CLEAR_STORAGE && wx.showModal({
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

    type === USER_ABOUT && wx.showModal({
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
  },

  hideOfficialAccount() {
    this.setData({
      showOfficialAccount: false
    })
  },

  onFeedBackButtonClick() {
    wx.vibrateLong()
  },

  bindPickerChange: function (e) {
    const index = e.detail.value
    const { pickerArray } = this.data
    const pickerValue = pickerArray[index]
    this.setData({
      pickerIndex: index
    })
    setCacheValidHours(pickerValue)
    wx.showModal({
      title: '缓存有效时间',
      content: `默认为4h, 您已将封面缓存有效时间设置为${pickerValue}h了`,
      showCancel: false,
      confirmText: '知道了',
    })
  },
})

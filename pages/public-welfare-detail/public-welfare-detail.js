// pages/public-welfare-detail/public-welfare-detail.js
import {
  getLostDetail
} from '../../models/public-welfare.js'

import {
  handleError
} from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    lost: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      id
    } = options
    this.setData({
      id
    })
    wx.showLoading()
    getLostDetail(id).then(res => {
      console.log(res)
      this.setData({
        lost: res
      })
      wx.setNavigationBarTitle({
        title: res.name
      })
      wx.hideLoading()
    }).catch(error => {
      wx.hideLoading()
      handleError(error)
    })
  },

  /**
   * 预览图片
   */
  previewImage() {
    const {
      img
    } = this.data.lost
    wx.previewImage({
      urls: [img],
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    const {
      id
    } = this.data

    wx.showNavigationBarLoading()
    getLostDetail(id).then(res => {
      this.setData({
        lost: res
      })
      wx.setNavigationBarTitle({
        title: res.name
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }).catch(error => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      handleError(error)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
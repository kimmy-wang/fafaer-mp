// pages/new-detail/new-detail.js
import {
  getArticleDetail
} from '../../models/new.js'

import {
  handleError
} from '../../utils/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    article_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { article_id } = options
    this.setData({
      article_id
    })
    wx.showLoading()
    getArticleDetail(article_id).then(res => {
      this.setData({
        article: res
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
      wx.hideLoading()
    }).catch(error => {
      wx.hideLoading()
      handleError(error)
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const { article_id } = this.data
  
    wx.showNavigationBarLoading()
    getArticleDetail(article_id).then(res => {
      this.setData({
        article: res
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }).catch(error => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      handleError(error)
    })
  }
})
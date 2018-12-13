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
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()
    getArticleDetail(options.article_id).then(res => {
      this.setData({
        article: res
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
      wx.hideLoading()
    }).catch(error => {
      console.log(error)
      wx.hideLoading()
      handleError()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  }
})
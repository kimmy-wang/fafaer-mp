// pages/user-about/user-about.js
import versions from '../../versions.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    versions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      versions
    })
  },

})

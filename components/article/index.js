// components/article/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showArticleDetail() {
      const { id } = this.data.article
      wx.navigateTo({
        url: `/pages/new-detail/new-detail?article_id=${id}`
      })
    }
  }
})

// components/video-collection/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoCollection: Object
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
    showVideoCollectionDetail() {
      const { id, name } = this.properties.videoCollection
      wx.navigateTo({
        url: `/pages/video-collection-detail/video-collection-detail?id=${id}&name=${name}`
      })
    }
  }
})

// components/gallery/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gallery: Object
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
    showGalleryDetail() {
      const { id } = this.data.gallery
      wx.navigateTo({
        url: `/pages/gallery-detail/gallery-detail?gallery_id=${id}`
      })
    }
  }
})

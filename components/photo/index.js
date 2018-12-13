// components/photo/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    photo: Object
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
    previewImage() {
      const img = this.properties.photo.file
      wx.previewImage({
        urls: [img]
      })
    }
  }
})

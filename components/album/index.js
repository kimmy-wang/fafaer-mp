// components/album/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    album: Object
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
    showAlbumDetail() {
      const { id, name } = this.data.album
      wx.navigateTo({
        url: `/pages/music-detail/music-detail?id=${id}&name=${name}`
      })
    }
  }
})

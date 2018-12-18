// components/video/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    video: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  attached() {
    
  },

  ready() {
    this.videoContext = wx.createVideoContext('video', this)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(e) {
      if (app.globalData.videoPlaying) {
        app.globalData.videoContext.pause()
      }
      app.globalData.videoPlaying = true
      app.globalData.videoContext = this.videoContext
      app.globalData.videoId = this.properties.video.id
    },

    onPause(e) {
      app.globalData.videoPlaying = false
      app.globalData.videoContext = null
      app.globalData.videoId = ''
    },

    onPlaying() {
      app.globalData.videoPlaying = true
      app.globalData.videoContext = this.videoContext
      app.globalData.videoId = this.properties.video.id
    },

    onEnded(e) {
      app.globalData.videoPlaying = false
      app.globalData.videoContext = null
      app.globalData.videoId = ''
    },

    onError() {
      wx.showToast({
        title: '视频错误信息',
        icon: 'none'
      })
    }
  }
})

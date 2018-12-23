// components/player-mini/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playing: Boolean,
    song: Object,
    duration: Number,
    currentTime: Number,
    coverImg: String
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
    onPlayTap() {
      this.triggerEvent("click", {}, {})
    }
  }
})

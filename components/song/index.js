// components/song/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    song: Object,
    index: {
      type: Number,
      value: -1
    }
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
    onSongClick() {
      const { song, index } = this.properties
      this.triggerEvent("click", { song, index }, {})
    }
  }
})

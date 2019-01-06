// components/confirm/index.js
import {
  getCacheNum,
} from '../../utils/more.js'

import {
  PAGE_SIZE
} from '../../utils/constants.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    },
    step: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 0
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    showCancelText: {
      type: Boolean,
      value: true
    },
    confirmText: {
      type: String,
      value: '确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: PAGE_SIZE,
  },

  attached() {
    const {
      type
    } = this.properties
    const value = getCacheNum(type)
    this.setData({
      value
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      const {
        value
      } = e.detail
      this.setData({
        value
      })
    },
    onCancel() {
      const {
        type
      } = this.properties
      this.triggerEvent("cancel", {
        type
      }, {})
    },
    onConfirm() {
      const {
        type
      } = this.properties
      const {
        value
      } = this.data

      this.triggerEvent("confirm", {
        type,
        value
      }, {})
    }
  }
})
// components/public-welfare/index.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    publicWelfare: Object
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
    showDetail() {
      const { id } = this.properties.publicWelfare
      this.triggerEvent("click", { id }, {})
    }
  }
})

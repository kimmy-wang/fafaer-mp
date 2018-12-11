const paginationBeh = Behavior({
  data: {
    dataArray: [],
    total: 0,
    loading: false,
    noneResult: false,
    page: 1,
    size: 5
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    getCurrentPage() {
      return this.data.page
    },

    getNextPage() {
      const page = this.data.page + 1
      this.setData({
        page
      })
      return page
    },

    getPageSize() {
      return this.data.size
    },

    setPageSize(size) {
      this.setData({
        size
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    getLoading() {
      return this.data.loading
    },

    setLoading(loading) {
      this.setData({
        loading
      })
    },

    setTotal(total) {
      this.setData({
        total,
        noneResult: total === 0
      })
    },

    hasMoreData() {
      return !(this.data.dataArray.length >= this.data.total)
    },

    reset() {
      this.setData({
        dataArray: [],
        total: 0,
        loading: false,
        noneResult: false,
        page: 1,
        size: 12
      })
    }
  }
})

export {
  paginationBeh
}
import {
  randCeil,
} from '../../utils/ads.js'

const baseBeh = Behavior({
  data: {
    search: {
      searchDataArray: [],
      searching: false,
    },
    dataArray: [],
    searching: false,
    more: '',
    total: 0,
    noneResult: false,
    loading: false,
    loadingCenter: false,
  },
  methods: {
    onSearching() {
      this.setData({
        searching: true
      })
    },

    onCancelSearch() {
      this.setData({
        searching: false
      })
      this.onClearSearch()
    },

    initSearchData(e) {
      this._loadSearchData(e)
    },

    updateSearchData(e) {
      this._loadSearchData(e)
    },

    _setTotal(total) {
      this.setData({
        total,
        noneResult: total === 0
      })
    },

    _getLoading(loading) {
      return this.data.loading
    },

    _setLoading(loading) {
      this.setData({
        loading
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})

const pageAdBeh = Behavior({
  data: {
    search: {
      searchAds: 0,
    },
    ads: 0,
  },

  methods: {
    onClearSearch() {
      this.setData({
        search: {
          searchDataArray: [],
          searching: false,
          searchAds: 0
        }
      })
    },

    /**
     * 列表页面，广告加载失败，隐藏广告
     * @param e
     */
    hideAd(e) {
      console.error(e)
      const { index } = e.target.dataset
      const { dataArray } = this.data
      let tempArray = dataArray.slice()
      tempArray[index] = {
        ...tempArray[index],
        type: 'none'
      }
      this.setData({
        dataArray: tempArray
      })
    },

    /**
     * 搜索列表页面，广告加载失败，隐藏广告
     * @param e
     */
    hideSearchAd(e) {
      console.error(e)
      const { index } = e.target.dataset
      const { search } = this.data
      const { searchDataArray } = search
      let tempArray = searchDataArray.slice()
      tempArray[index] = {
        ...tempArray[index],
        type: 'none'
      }
      this.setData({
        search: {
          ...search,
          searchDataArray: tempArray
        }
      })
    },

    _loadSearchData(e) {
      const {
        data,
        searching
      } = e.detail
      const { searchDataArray } = this.data.search
      let { searchAds } = this.data.search
      const tempArray = searchDataArray.concat(data)

      let tempAdArray = tempArray.slice()
      let index = randCeil(searchDataArray.length, tempArray.length)
      if (!searchDataArray.length && !index && data.length > 1) {
        ++index
      }
      tempAdArray.splice(index, 0, {
        type: 'ad'
      })
      ++searchAds

      this.setData({
        search: {
          searchDataArray: tempAdArray,
          searching,
          searchAds
        }
      })
    },

    _setRefreshData(dataArray) {
      let tempAdArray = dataArray.slice()
      let ads = 0
      if (dataArray.length > 1) {
        const index = randCeil(0, tempAdArray.length)
        tempAdArray.splice(index, 0, {
          type: 'ad'
        })
        ads = 1
      }
      this.setData({
        dataArray: tempAdArray,
        ads
      })
    },

    _setMoreData(data) {
      const {
        dataArray
      } = this.data
      let {
        ads
      } = this.data
      const tempArray = dataArray.concat(data)
      let tempAdArray = tempArray.slice()
      if (data.length > 1) {
        let index = randCeil(dataArray.length, tempArray.length)
        if (!dataArray.length && !index) {
          ++index
        }
        tempAdArray.splice(index, 0, {
          type: 'ad'
        })
        ++ads
      }

      this.setData({
        dataArray: tempAdArray,
        ads,
      })
    },

    _hasMoreData() {
      const { dataArray, total, ads } = this.data
      return !((dataArray.length - ads) >= total)
    },
  }
})

const pageNotAdBeh = Behavior({
  methods: {
    onClearSearch() {
      this.setData({
        search: {
          searchDataArray: [],
          searching: false,
        }
      })
    },

    _loadSearchData(e) {
      const { data, searching } = e.detail
      const searchDataArray = this.data.search.searchDataArray.concat(data)
      this.setData({
        search: {
          searchDataArray,
          searching
        }
      })
    },

    _setRefreshData(dataArray) {
      this.setData({
        dataArray
      })
    },

    _setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    _hasMoreData() {
      return !(this.data.dataArray.length >= this.data.total)
    },
  }
})

export {
  baseBeh,
  pageAdBeh,
  pageNotAdBeh
}
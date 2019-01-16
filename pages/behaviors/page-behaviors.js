import {
  randCeil,
} from '../../utils/ads.js'

import {
  tabBarList,
  happyNewYearTabBarList
} from '../../tab-bar.js'

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
    // onPageScroll(e) {
    //   const { scrollTop } = e
    //   if (scrollTop < 0) return
    //   const preScrollTop = this.scrollTop || 0
    //   const hideTabBar = this.hideTabBar
    //   if (preScrollTop <= scrollTop) {
    //     console.log(preScrollTop, scrollTop, hideTabBar)
    //     wx.hideTabBar({ animation: true })
    //     this.hideTabBar = true
    //   } else if (preScrollTop > scrollTop) {
    //     console.log(preScrollTop, scrollTop, hideTabBar)
    //     wx.showTabBar({ animation: true })
    //     this.hideTabBar = false
    //   }
    //   this.scrollTop = scrollTop
    // },

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
    },

    _toggleTabBar() {
      const preDate = new Date(2018, 2, 1, 0, 0, 0)
      const nextDate = new Date(2019, 2, 11, 0, 0, 0)
      const currentDateTime = Date.now()

      let tabList = tabBarList
      let style = {
        color: '#888888',
        selectedColor: '#09BB07',
        backgroundColor: '#FFFFFF',
      }
      if (currentDateTime >= preDate.getTime() && currentDateTime < nextDate) {
        style = {
          color: '#FF0000',
          selectedColor: '#00FF00',
          backgroundColor: '#FFFFFF',
          borderStyle: 'white'
        }
        tabList = happyNewYearTabBarList
      } else {
        style = {
          color: '#888888',
          selectedColor: '#09BB07',
          backgroundColor: '#FFFFFF',
        }
        tabList = tabBarList
      }

      wx.setTabBarStyle(style)

      const length = tabList.length
      length && tabList.forEach((item, index) => {
        wx.setTabBarItem({
          index: index,
          text: item.text,
          iconPath: item.iconPath,
          selectedIconPath: item.selectedIconPath
        })
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

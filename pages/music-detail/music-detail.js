// pages/music-detail/music-detail.js
import {
  getAlbumDetail,
  getSongListByAlbumId
} from '../../models/music.js'

import {
  random,
  handleError
} from '../../utils/common.js'

import {
  Pagination
} from '../../models/Pagination.js'

import {
  HISTORY_SEARCH_MUSIC_SONG,
  MORE_MUSIC
} from '../../utils/constants.js'

import {
  getCacheNum
} from '../../utils/more.js'

const pagination = new Pagination()
const pageSize = getCacheNum(MORE_MUSIC)
pagination.setPageSize(pageSize)

const mMgr = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      searchDataArray: [],
      searching: false
    },
    dataArray: [],
    searching: false,
    more: '',
    total: 0,
    noneResult: false,
    loading: false,
    loadingCenter: false,
    searchUrl: '',
    albumId: '',
    album: null,
    historySearchType: HISTORY_SEARCH_MUSIC_SONG,

    playing: false,
    currentSong: null,
    currentSongIndex: -1,
    duration: 0,
    currentTime: 0,

    headerPosition: 'none',
    headerTop: 0,
    marginTop: 0,
    windowWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const windowWidth = wx.getSystemInfoSync().windowWidth
    const { id, name } = options
    wx.setNavigationBarTitle({
      title: name
    })

    this.setData({
      windowWidth,
      searchUrl: `music/album_detail/?album_id=${id}&`,
      albumId: id
    })
    this._showLoadingCenter()
    const albumPromise = getAlbumDetail(id)
    const songsPromise = getSongListByAlbumId(id, pagination.getFirstPage(), pagination.getPageSize())
    Promise.all([albumPromise, songsPromise]).then(res => {
      this.setData({
        album: res[0]
      })
      this._setMoreData(res[1].results)
      this._setTotal(res[1].count)
      this._hideLoadingCenter()
    }).catch(error => {
      this._hideLoadingCenter()
      handleError(error)
    })
  },

  onReady() {
    this._recoverStatus()
    this._switchMusic()
  },

  /**
   * 页面滚动处理
   */
  onPageScroll(e) {
    const { scrollTop } = e
    const { windowWidth, headerPosition } = this.data
    const height = (400 / 750) * windowWidth;
    // console.log(scrollTop, height)
    let currentHeaderPosition = scrollTop >= height ? 'fixed' : 'none'
    let currentHeaderTop = scrollTop >= height ? 100 : 0
    let currentMarginTop = scrollTop >= height ? 100 : 0
    if (currentHeaderPosition === headerPosition) {
      return
    }
    
    this.setData({
      headerPosition: currentHeaderPosition,
      headerTop: currentHeaderTop,
      marginTop: currentMarginTop
    })
  },

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

  onClearSearch() {
    this.setData({
      search: {
        searchDataArray: [],
        searching: false
      }
    })
  },

  /**
   * 切换音乐播放模式
   */
  switchPlayMode() {
    wx.showToast({
      title: '客官, 稍等...',
      icon: 'none'
    })
  },

  /**
   * 皮一下
   */
  happy() {
    wx.showToast({
      title: '皮一下O(∩_∩)O',
      icon: 'none'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const { searching } = this.data
    if (searching) {
      wx.stopPullDownRefresh()
      return
    }
    const pageSize = getCacheNum(MORE_MUSIC)
    pagination.setPageSize(pageSize)
    const { albumId } = this.data
    wx.showNavigationBarLoading()
    const albumPromise = getAlbumDetail(albumId)
    const songsPromise = getSongListByAlbumId(albumId, 1, pagination.getPageSize())
    Promise.all([albumPromise, songsPromise]).then(res => {
      this.setData({
        album: res[0]
      })
      this._setRefreshData(res[1].results)
      this._setTotal(res[1].count)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }).catch(error => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      handleError(error)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const more = random(16)
    this.setData({
      more
    })

    if (this._getLoading()) {
      return
    }

    if (!this._hasMoreData()) {
      wx.showToast({
        title: '没有数据啦',
        icon: 'none'
      })
      return
    }

    this._setLoading(true)
    getSongListByAlbumId(this.data.albumId, pagination.getNextPage(), pagination.getPageSize()).then(res => {
      console.log(res)
      this._setMoreData(res.results)
      this._setLoading(false)
    }).catch(error => {
      this._setLoading(false)
      handleError(error)
    })
  },

  /**
   * 歌曲点击事件
   */
  onSongClick(e) {
    const { song, index } = e.detail
    // console.log(index)
    this.setData({
      currentSong: song,
      currentSongIndex: index,
    })
    this._onPlayMiniClick()
  },

  /**
   * 播放
   */
  onPlayMiniClick(e) {
    const { currentSong, dataArray } = this.data
    if (currentSong === null) {
      if(!dataArray || !dataArray.length) {
        wx.showToast({
          title: '歌曲列表为空',
          icon: 'none'
        })
        return
      }
      this.setData({
        currentSong: dataArray[0].song,
        currentSongIndex: 0,
      })
    }
    this._onPlayMiniClick()
  },

  /**
   * 下一首
   */
  onNextMiniClick() {
    const { currentSong, currentSongIndex, dataArray } = this.data
    if (currentSong === null) {
      if (!dataArray || !dataArray.length) {
        wx.showToast({
          title: '歌曲列表为空',
          icon: 'none'
        })
        return
      }
      this.setData({
        currentSong: dataArray[0].song,
        currentSongIndex: 0,
      })
    } else {
      if ((currentSongIndex + 1) === dataArray.length) {
        wx.showToast({
          title: '最后一首了',
          icon: 'none'
        })
        return
      }
      this.setData({
        currentSong: dataArray[currentSongIndex + 1].song,
        currentSongIndex: currentSongIndex + 1,
      })
    }
    this._onPlayMiniClick()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  initSearchData(e) {
    this._loadSearchData(e)
  },

  updateSearchData(e) {
    this._loadSearchData(e)
  },

  _onPlayMiniClick() {
    const { playing, currentSong } = this.data

    if (!playing) {
      this.setData({
        playing: true
      })
      mMgr.title = currentSong.name
      mMgr.src = currentSong.file
    }
    else {
      this.setData({
        playing: false
      })
      mMgr.pause()
    }
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

  _setTotal(total) {
    this.setData({
      total,
      noneResult: total === 0
    })
  },

  _hasMoreData() {
    return !(this.data.dataArray.length >= this.data.total)
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

  _recoverStatus() {
    const { currentSong } = this.data
    if(!currentSong) {
      return
    }
    if (mMgr.paused) {
      this.setData({
        playing: false
      })
      return
    }

    if (mMgr.src === currentSong.file) {
      this.setData({
        playing: true
      })
    }
  },

  _switchMusic() {
    // mMgr.onCanplay(() => {
    //   this.setData({
    //     duration: Math.ceil(mMgr.duration)
    //   })
    // })
    mMgr.onTimeUpdate(() => {
      // console.log("onTimeUpdate", Math.ceil(mMgr.currentTime))
      // console.log("onTimeUpdateduration", Math.ceil(mMgr.duration))
      this.setData({
        currentTime: Math.ceil(mMgr.currentTime),
        duration: Math.ceil(mMgr.duration)
      })
    })
    mMgr.onPlay(e => {
      this._recoverStatus()
    })
    mMgr.onPause(() => {
      this._recoverStatus()
    })
    mMgr.onStop(() => {
      this._recoverStatus()
    })
    mMgr.onEnded(() => {
      this._recoverStatus()
    })
  }
})
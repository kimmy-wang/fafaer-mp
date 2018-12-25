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
    duration: 0,
    currentTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, name } = options
    wx.setNavigationBarTitle({
      title: name
    })

    this.setData({
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

  onSongClick(e) {
    const { song } = e.detail
    this.setData({
      currentSong: song
    })
    this.onPlayMiniClick()
  },

  onPlayMiniClick(e) {
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
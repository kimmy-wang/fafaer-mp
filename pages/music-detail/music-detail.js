// pages/music-detail/music-detail.js
const app = getApp()
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
  USER_MUSIC
} from '../../utils/constants.js'

import {
  getCacheNum
} from '../../utils/cache.js'

import {
  baseBeh,
  pageNotAdBeh
} from '../behaviors/page-behaviors.js'

const pagination = new Pagination()
const pageSize = getCacheNum(USER_MUSIC)
pagination.setPageSize(pageSize)

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [baseBeh, pageNotAdBeh],

  /**
   * 页面的初始数据
   */
  data: {
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
    windowWidth: 0,
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      const { playing, currentSong, currentSongIndex, duration } = app.globalData
      this.setData({
        playing,
        currentSong,
        currentSongIndex,
        duration,
      })
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
      const pageSize = getCacheNum(USER_MUSIC)
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
      const { searching } = this.data
      if (searching) {
        const more = random(16)
        this.setData({
          more
        })
        return
      }

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
      const { currentSong, playing } = this.data
      if (currentSong && currentSong.file === song.file) {
        playing && mMgr && mMgr.pause()
        !playing && mMgr && mMgr.play()
        this.setData({
          playing: !playing
        })
        app.globalData.playing = !playing
        return;
      }
      // console.log(index)
      this.setData({
        currentSong: song,
        currentSongIndex: index,
      })
      app.globalData.currentSong = song
      app.globalData.currentSongIndex = index
      // this._triggerPlayer()
      this._onPlayMiniClick()
    },

    triggerPlayer(e) {
      this._triggerPlayer()
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
        app.globalData.currentSong = dataArray[0].song
        app.globalData.currentSongIndex = 0
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
        app.globalData.currentSong = dataArray[0].song
        app.globalData.currentSongIndex = 0
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
        app.globalData.currentSong = dataArray[currentSongIndex + 1].song
        app.globalData.currentSongIndex = currentSongIndex + 1
      }
      this._onPlayMiniClick()
    },

    _onPlayMiniClick() {
      const { playing, currentSong } = this.data

      if (!playing) {
        this.setData({
          playing: true
        })
        app.globalData.playing = true
        mMgr.title = currentSong.name
        mMgr.src = currentSong.file
      }
      else {
        this.setData({
          playing: false
        })
        app.globalData.playing = false
        mMgr.pause()
      }
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
        app.globalData.playing = false
        return
      }

      if (mMgr.src === currentSong.file) {
        this.setData({
          playing: true
        })
        app.globalData.playing = true
      }
    },

    _triggerPlayer() {
      const { currentSong } = this.data
      currentSong && wx.navigateTo({
        url: `/pages/playing-song-detail/playing-song-detail?songId=${currentSong.id}`,
      })
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
        let currentTime = Math.ceil(mMgr.currentTime)
        let duration = Math.ceil(mMgr.duration)
        this.setData({
          currentTime,
          duration
        })
        app.globalData.duration = duration
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
  }
})

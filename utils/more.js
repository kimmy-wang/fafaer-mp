import {
  MORE_ARTICLE,
  MORE_MUSIC,
  MORE_VIDEO,
  MORE_PHOTO,
  MORE_ADMIRATION,
  MORE_ABOUT,

  MORE_SHOW_CONFIRM_ONCE
} from '../utils/constants.js'

const settings = [
  [
    {
      id: 11,
      title: "新闻",
      icon: "/images/more/article@fill.png",
      type: MORE_ARTICLE
    },
    {
      id: 12,
      title: "音乐",
      icon: "/images/more/music@fill.png",
      type: MORE_MUSIC
    },
    {
      id: 13,
      title: "视频集",
      icon: "/images/more/video@fill.png",
      type: MORE_VIDEO
    },
    {
      id: 14,
      title: "相册",
      icon: "/images/more/photo@fill.png",
      type: MORE_PHOTO
    }
  ],
  [
    {
      id: 21,
      title: "赞赏",
      icon: "/images/more/pay@fill.png",
      type: MORE_ADMIRATION
    },
    {
      id: 22,
      title: "关于",
      icon: "/images/more/about@fill.png",
      type: MORE_ABOUT
    }
  ]
]

const cacheActions = {
  [MORE_ARTICLE](that, value) {
    that.setData({
      articleNum: value
    })
  },

  [MORE_MUSIC](that, value) {
    that.setData({
      musicNum: value
    })
  },

  [MORE_VIDEO](that, value) {
    that.setData({
      videoNum: value
    })
  },

  [MORE_PHOTO](that, value) {
    that.setData({
      photoNum: value
    })
  },
}



const getCacheNum = type => {
  return _getValueFromCache(type) || 5
}

const setCacheNum = (type, value) => {
  _setValueToCache(type, value)
}

const getShowConfirmOnce = () => {
  return _getValueFromCache(MORE_SHOW_CONFIRM_ONCE) || false
}

const setShowConfirmOnce = () => {
  _setValueToCache(MORE_SHOW_CONFIRM_ONCE, true)
}

const _getValueFromCache = key => {
  return wx.getStorageSync(key)
}

const _setValueToCache = (key, value) => {
  wx.setStorageSync(key, value)
}

export {
  settings,
  cacheActions,
  getCacheNum,
  setCacheNum,

  getShowConfirmOnce,
  setShowConfirmOnce
} 
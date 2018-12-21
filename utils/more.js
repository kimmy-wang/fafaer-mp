import {
  MORE_ARTICLE,
  MORE_MUSIC,
  MORE_VIDEO,
  MORE_PHOTO
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
    }
  ],
  [
    {
      id: 21,
      title: "相册",
      icon: "/images/more/photo@fill.png",
      type: MORE_PHOTO
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
  return wx.getStorageSync(type) || 5
}

const setCacheNum = (type, value) => {
  wx.setStorageSync(type, value)
}

export {
  settings,
  cacheActions,
  getCacheNum,
  setCacheNum
} 
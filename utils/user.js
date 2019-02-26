import {
  USER_ARTICLE,
  USER_MUSIC,
  USER_VIDEO,
  USER_PHOTO,
  USER_ADMIRATION,
  USER_PUBLIC_WELFARE,
  USER_MINI_PROGRAM_COVER,
  USER_CLEAR_STORAGE,
  USER_FEED_BACK,
  USER_ABOUT
} from '../utils/constants.js'

const settings = [
  {
    id: 100,
    title: '分页设置',
    list: [
      {
        id: 105,
        title: "新闻",
        icon: "/images/user/article@fill.png",
        type: USER_ARTICLE
      },
      {
        id: 110,
        title: "音乐",
        icon: "/images/user/music@fill.png",
        type: USER_MUSIC
      },
      {
        id: 115,
        title: "视频集",
        icon: "/images/user/video@fill.png",
        type: USER_VIDEO
      },
      {
        id: 120,
        title: "相册",
        icon: "/images/user/photo@fill.png",
        type: USER_PHOTO
      }
    ]
  },
  {
    id: 200,
    title: '其它设置',
    list: [
      {
        id: 205,
        title: "赞赏",
        icon: "/images/user/pay@fill.png",
        type: USER_ADMIRATION
      },
      {
        id: 210,
        title: "公益",
        icon: "/images/user/gongyi.png",
        type: USER_PUBLIC_WELFARE
      },
      {
        id: 215,
        title: "封面",
        icon: "/images/user/cover@fill.png",
        type: USER_MINI_PROGRAM_COVER
      },
      {
        id: 220,
        title: "缓存",
        icon: "/images/user/clear@fill.png",
        type: USER_CLEAR_STORAGE
      },
      {
        id: 225,
        title: "反馈",
        icon: "/images/user/feedback@fill.png",
        type: USER_FEED_BACK
      },
      {
        id: 230,
        title: "关于",
        icon: "/images/user/about@fill.png",
        type: USER_ABOUT
      }
    ]
  }
]

export default settings

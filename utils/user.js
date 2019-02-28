import {
  USER_ARTICLE,
  USER_MUSIC,
  USER_VIDEO,
  USER_PHOTO,
  USER_ADMIRATION,
  USER_PUBLIC_WELFARE,
  USER_SHOW_AD,
  USER_MINI_PROGRAM_COVER,
  USER_CLEAR_STORAGE,
  USER_COVER_CACHE_VALID_HOURS,
  USER_FEED_BACK,
  USER_ABOUT,
  USER_SETTINGS
} from '../utils/constants.js'

const user_menus = [
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
    title: '',
    list: [
      {
        id: 205,
        title: "设置",
        icon: "/images/user/settings@fill.png",
        type: USER_SETTINGS
      }
    ]
  }
]

const user_settings_menus = [
  {
    id: 100,
    title: '',
    list: [
      {
        id: 105,
        title: "赞赏",
        icon: "/images/user/pay@fill.png",
        type: USER_ADMIRATION
      },
      {
        id: 110,
        title: "公益",
        icon: "/images/user/gongyi.png",
        type: USER_PUBLIC_WELFARE
      },
      {
        id: 115,
        title: "显示广告",
        icon: "/images/user/ad@fill.png",
        type: USER_SHOW_AD
      }
    ]
  },
  {
    id: 200,
    title: '',
    list: [
      {
        id: 205,
        title: "封面",
        icon: "/images/user/cover@fill.png",
        type: USER_MINI_PROGRAM_COVER
      },
      {
        id: 210,
        title: "缓存",
        icon: "/images/user/clear@fill.png",
        type: USER_CLEAR_STORAGE
      },
      {
        id: 215,
        title: "缓存有效时间",
        icon: "/images/user/time@fill.png",
        type: USER_COVER_CACHE_VALID_HOURS
      }
    ]
  },
  {
    id: 300,
    title: '',
    list: [
      {
        id: 305,
        title: "反馈",
        icon: "/images/user/feedback@fill.png",
        type: USER_FEED_BACK
      },
      {
        id: 310,
        title: "关于",
        icon: "/images/user/about@fill.png",
        type: USER_ABOUT
      }
    ]
  }
]

export {
  user_menus,
  user_settings_menus
}

import {
  MORE_ARTICLE,
  MORE_MUSIC,
  MORE_VIDEO,
  MORE_PHOTO,
  MORE_ADMIRATION,
  MORE_PUBLIC_WELFARE,
  MORE_ABOUT
} from '../utils/constants.js'

const settings = [
  {
    id: '10',
    title: '分页设置',
    list: [
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
    ]
  },
  {
    id: '20',
    title: '其它设置',
    list: [
      {
        id: 21,
        title: "赞赏",
        icon: "/images/more/pay@fill.png",
        type: MORE_ADMIRATION
      },
      {
        id: 22,
        title: "公益",
        icon: "/images/more/gongyi.png",
        type: MORE_PUBLIC_WELFARE
      },
      {
        id: 23,
        title: "关于",
        icon: "/images/more/about@fill.png",
        type: MORE_ABOUT
      }
    ]
  }
]

export default settings
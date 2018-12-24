import {
  http
} from '../utils/http.js'

import {
  PAGE_SIZE
} from '../utils/constants.js'

const getAlbumList = (page = 1, size = PAGE_SIZE) => {
  return http({
    url: `music/album?page=${page}&size=${size}`
  })
}

const getAlbumDetail = id => {
  return http({
    url: `music/album/${id}`
  })
}

const getSongListByAlbumId = (id, page = 1, size = PAGE_SIZE) => {
  return http({
    url: `music/album_detail/?album_id=${id}&page=${page}&size=${size}`
  })
}

const getRadioList = (page = 1, size = PAGE_SIZE) => {
  return http({
    url: `music/audio?page=${page}&size=${size}`
  })
}

export {
  getAlbumList,
  getAlbumDetail,
  getSongListByAlbumId,
  getRadioList
}
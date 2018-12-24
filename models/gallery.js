import {
  http
} from '../utils/http.js'

import {
  PAGE_SIZE
} from '../utils/constants.js'

const getGallery = (page = 1, size = PAGE_SIZE) => {
  return http({
    url: `photos/gallery?page=${page}&size=${size}`
  })
}

const getGalleryDetail = (id, page = 1, size = PAGE_SIZE) => {
  return http({
    url: `photos/detail/?gallery_id=${id}&page=${page}&size=${size}`
  })
}

export {
  getGallery,
  getGalleryDetail
}
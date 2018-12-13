import {
  http
} from '../utils/http.js'

const getGallery = (page = 1, size = 12) => {
  return http({
    url: `photos/gallery?page=${page}&size=${size}`
  })
}

const getGalleryDetail = (id, page = 1, size = 12) => {
  return http({
    url: `photos/detail/?gallery_id=${id}&page=${page}&size=${size}`
  })
}

export {
  getGallery,
  getGalleryDetail
}
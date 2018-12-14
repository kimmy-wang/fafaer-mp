import {
  http
} from '../utils/http.js'

const getVideoCollection = (page = 1, size = 12) => {
  return http({
    url: `videos/collection/?page=${page}&size=${size}`
  })
}

const getVideoCollectionDetail = (id, page = 1, size = 12) => {
  return http({
    url: `videos/detail/?videocollection_id=${id}&page=${page}&size=${size}`
  })
}

export {
  getVideoCollection,
  getVideoCollectionDetail
}
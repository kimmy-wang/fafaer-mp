import {
  http
} from '../utils/http.js'

import {
  PAGE_SIZE
} from '../utils/constants.js'

const getVideoCollection = (page = 1, size = PAGE_SIZE) => {
  return http({
    url: `videos/collection/?page=${page}&size=${size}`
  })
}

const getVideoCollectionDetail = (id, page = 1, size = PAGE_SIZE) => {
  return http({
    url: `videos/detail/?videocollection_id=${id}&page=${page}&size=${size}`
  })
}

export {
  getVideoCollection,
  getVideoCollectionDetail
}
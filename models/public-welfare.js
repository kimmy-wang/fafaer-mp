import {
  http
} from '../utils/http.js'

import {
  PAGE_SIZE
} from '../utils/constants.js'

const getLostList = (page = 1, size = PAGE_SIZE) => {
  return http({
    url: `public_welfare/lost/?page=${page}&size=${size}`
  })
}

const getLostDetail = id => {
  return http({
    url: `public_welfare/lost/${id}`
  })
}

export {
  getLostList,
  getLostDetail
}
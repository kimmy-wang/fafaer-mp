import {
  http
} from '../utils/http.js'

import {
  PAGE_SIZE
} from '../utils/constants.js'

const search = (url, q, page = 1, size = PAGE_SIZE) => {
  return http({
    url: `${url}search=${q}&page=${page}&size=${size}`
  })
}

export {
  search
}
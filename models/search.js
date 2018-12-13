import {
  http
} from '../utils/http.js'

const search = (url, q, page = 1, size = 12) => {
  return http({
    url: `${url}search=${q}&page=${page}&size=${size}`
  })
}

export {
  search
}
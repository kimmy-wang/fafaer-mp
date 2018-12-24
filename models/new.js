import {
  http
} from '../utils/http.js'

import {
  PAGE_SIZE
} from '../utils/constants.js'

const getArticles = (page = 1, size = PAGE_SIZE) => {
  return http({
    url: `news/articles?page=${page}&size=${size}`
  })
}

const getArticleDetail = id => {
  return http({
    url: `news/articles/${id}`
  })
}

export {
  getArticles,
  getArticleDetail
}
import {
  http
} from '../utils/http.js'

const getArticles = (page = 1, size = 12) => {
  return http({
    url: `news/articles?page=${page}&size=${size}`
  })
}

const getArticleDetail = id => {
  return http({
    url: `news/articles/${id}`
  })
}

const search = (q, page, size = 12) => {
  return http({
    url: `news/articles/?search=${q}&page=${page}&size=${size}`
  })
}

export {
  getArticles,
  getArticleDetail,
  search
}
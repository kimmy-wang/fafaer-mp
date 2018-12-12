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

const search = (url, q, page = 1, size = 12) => {
  return http({
    url: `${url}?search=${q}&page=${page}&size=${size}`
  })
}

export {
  getArticles,
  getArticleDetail,
  search
}
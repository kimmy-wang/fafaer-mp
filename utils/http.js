import config from '../config.js'

// 解构
const http = ({ url, data = {}, method = 'GET' }) => {
  return new Promise((resolve, reject) => {
    _http(url, resolve, reject, data, method)
  })
}

const _http = (url, resolve, reject, data = {}, method = 'GET') => {
  wx.request({
    url: `${config.base_url}${url}`,
    data,
    header: {
      'content-type': 'application/json'
    },
    method,
    success(res) {
      console.log(res)
      const { data } = res
      if (data.error) {
        reject(data.error)
      }
      else {
        resolve(data)
      }
    },
    fail(error) {
      reject(error)
    }
  })
}

export {
  http
};
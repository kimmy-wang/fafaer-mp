import {
  http
} from '../utils/http.js'

const getBannerList = () => {
  return http({
    url: 'mp/banner/?ordering=order'
  })
}

export {
  getBannerList
}
import {
  PAGE_SIZE,
  VALID_SECONDS
} from '../utils/constants.js'

import {
  getCurrentTime
} from './date.js'

const getCacheNum = type => {
  return _getValueFromCache(type) || PAGE_SIZE
}

const setCacheNum = (type, value) => {
  _setValueToCache(type, value)
}

const getShowConfirmOnce = type => {
  return _getValueFromCache(type) || false
}

const setShowConfirmOnce = type => {
  _setValueToCache(type, true)
}

const getValidDataFromCache = (type, seconds = VALID_SECONDS) => {
  let data = _getValueFromCache(type)
  if (!data || (getCurrentTime() - seconds * 1000) > parseInt(data.timestamp)) {
    return null
  }
  return data.data
}

const setValidDataFromCache = (type, data) => {
  wx.setStorageSync(type, {
    data,
    timestamp: getCurrentTime()
  })
}

const _getValueFromCache = key => {
  return wx.getStorageSync(key)
}

const _setValueToCache = (key, value) => {
  wx.setStorageSync(key, value)
}

export {
  getCacheNum,
  setCacheNum,

  getShowConfirmOnce,
  setShowConfirmOnce,

  getValidDataFromCache,
  setValidDataFromCache
} 
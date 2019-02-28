import {
  PAGE_SIZE,
  COVER_CACHE_VALID_HOURS,
  CACHE_USER_COVER_VALID_HOURS,
  CACHE_USER_SHOW_AD
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

const getCacheValidHours = () => {
  return _getValueFromCache(CACHE_USER_COVER_VALID_HOURS) || COVER_CACHE_VALID_HOURS
}

const setCacheValidHours = (value) => {
  _setValueToCache(CACHE_USER_COVER_VALID_HOURS, value)
}

const getCacheShowAd = () => {
  return _getValueFromCache(CACHE_USER_SHOW_AD) || 'Y'
}

const setCacheShowAd = (value) => {
  _setValueToCache(CACHE_USER_SHOW_AD, value)
}

const getShowConfirmOnce = type => {
  return _getValueFromCache(type) || false
}

const setShowConfirmOnce = type => {
  _setValueToCache(type, true)
}

const getValidDataFromCache = (type) => {
  const hours = parseInt(getCacheValidHours())
  let data = _getValueFromCache(type)
  if (!data || (getCurrentTime() - hours * 60 * 60 * 1000) > parseInt(data.timestamp)) {
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

  getCacheValidHours,
  setCacheValidHours,

  getCacheShowAd,
  setCacheShowAd,

  getShowConfirmOnce,
  setShowConfirmOnce,

  getValidDataFromCache,
  setValidDataFromCache
}

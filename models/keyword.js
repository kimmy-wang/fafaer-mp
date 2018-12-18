import {
  HISTORY_SEARCH
} from '../utils/constants.js'

const MAX_LENGTH = 10

const getHistorySearch = (type) => {
  const key = type || HISTORY_SEARCH
  return wx.getStorageSync(key) || []
}

const addHistorySearch = (type, text) => {
  let historySearch = getHistorySearch(type)
  const index = historySearch.indexOf(text)
  if (index === 0) {
    return
  }

  index > 0 && historySearch.splice(index, 1)

  historySearch.unshift(text)
  while (historySearch.length > MAX_LENGTH) {
    historySearch.splice((historySearch.length - 1), 1)
  }

  const key = type || HISTORY_SEARCH
  wx.setStorageSync(key, historySearch)
}

export {
  getHistorySearch,
  addHistorySearch
}
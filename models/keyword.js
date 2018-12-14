const HISTORY_SEARCH_KEY = "HISTORY_SEARCH"
const MAX_LENGTH = 10

const types = {
  100: 'HISTORY_SEARCH_ARTICLE',
  200: 'HISTORY_SEARCH_MUSIC',
  300: 'HISTORY_SEARCH_VIDEO_COLLECTION',
  301: 'HISTORY_SEARCH_VIDEO_COLLECTION_VIDEO',
  400: 'HISTORY_SEARCH_GALLERY',
  401: 'HISTORY_SEARCH_GALLERY_PHOTO',
}

const getHistorySearch = (type) => {
  const key = types[type] || HISTORY_SEARCH_KEY
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
  if (historySearch.length > MAX_LENGTH) {
    historySearch.splice((historySearch.length - 1), 1)
  }

  const key = types[type] || HISTORY_SEARCH_KEY
  wx.setStorageSync(key, historySearch)
}

export {
  getHistorySearch,
  addHistorySearch
}
const HISTORY_SEARCH_KEY = "HISTORY_SEARCH"
const MAX_LENGTH = 10

const getHistorySearch = () => {
  return wx.getStorageSync(HISTORY_SEARCH_KEY) || []
}

const addHistorySearch = text => {
  let historySearch = getHistorySearch()
  const index = historySearch.indexOf(text)
  if (index === 0) {
    return
  }

  index > 0 && historySearch.splice(index, 1)

  historySearch.unshift(text)
  if (historySearch.length > MAX_LENGTH) {
    historySearch.splice((historySearch.length - 1), 1)
  }
  wx.setStorageSync(HISTORY_SEARCH_KEY, historySearch)
}

export {
  getHistorySearch,
  addHistorySearch
}
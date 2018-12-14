class Pagination {
  constructor(page = 1, size = 5) {
    this.page = page
    this.size = size
  }

  getFirstPage() {
    return this.page
  }

  getNextPage() {
    const page = this.page + 1
    this.page = page
    return page
  }

  getPageSize() {
    return this.size
  }

  setPageSize(size) {
    this.size = size
  }
}

export {
  Pagination
}
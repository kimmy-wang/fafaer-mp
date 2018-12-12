class Pagination {
  constructor(page = 1, size = 5) {
    this.page = page
    this.size = size
  }

  getNextPage() {
    const page = this.page + 1
    this.page = page
    return page
  }

  getPageSize() {
    return this.size
  }
}

export {
  Pagination
}
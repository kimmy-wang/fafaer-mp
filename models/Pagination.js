class Pagination {
  constructor(x, y) {
    this.page = 1
    this.size = 5
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
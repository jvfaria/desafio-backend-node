'use strict'

class Category {
  get rules () {
    return {
      name: 'required|string|unique'
    }
  }
}

module.exports = Category

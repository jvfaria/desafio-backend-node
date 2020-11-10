'use strict'

class Product {
  get rules () {
    return {
      name: 'required|max:45',
      stock_balance: 'required|number',
      image_file_name: 'string',
      category_name: 'required|string',
      price: 'required|number'
    }
  }
}

module.exports = Product

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeDelete', 'SaleHook.addProductBalance')
  }

  products () {
    return this
      .belongsToMany('App/Models/Product')
      .pivotTable('sale_products')
      .withPivot(['quantity'])
  }

  salesProducts () {
    return this.pivotTable('salesProducts')
  }
}

module.exports = Sale

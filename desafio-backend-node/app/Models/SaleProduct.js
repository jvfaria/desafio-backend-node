'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SaleProduct extends Model {
  static boot () {
    super.boot()

    this.addHook('afterSave', 'SaleProductHook.removeProductBalance')
  }
}

module.exports = SaleProduct

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  products () {
    return this.belongsToMany('App/Models/Products')
  }
}

module.exports = Sale

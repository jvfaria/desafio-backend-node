'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Image extends Model {
  product () {
    return this.hasOne('App/Models/Product')
  }
}

module.exports = Image

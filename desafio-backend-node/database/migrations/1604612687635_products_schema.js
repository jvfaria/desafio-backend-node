'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments().primary().unique()
      table.string('name').notNullable()
      table.integer('stock_balance').notNullable().default(0)
      table.string('image_id', 255)
      table.integer('categorie_id').notNullable()
      table.integer('price').notNullable().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesProductSchema extends Schema {
  up () {
    this.create('sales_products', (table) => {
      table.increments().primary().unique()
      table.integer('product_id').notNullable()
      table.integer('sales_id').notNullable()
      table.integer('quantity').notNullable()
      table.integer('total_price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sales_products')
  }
}

module.exports = SalesProductSchema

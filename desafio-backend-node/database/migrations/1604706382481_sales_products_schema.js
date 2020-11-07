'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SalesProductSchema extends Schema {
  up () {
    this.create('sales_products', (table) => {
      table.increments()
      table.integer('product_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('sale_id').notNullable()
        .unsigned()
        .references('id')
        .inTable('sales')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('quantity').notNullable()
      table.decimal('total_price', 14, 2).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sales_products')
  }
}

module.exports = SalesProductSchema

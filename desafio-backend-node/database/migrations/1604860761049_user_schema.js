'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 45).notNullable()
      table.string('email', 45).notNullable()
      table.string('password').notNullable()
      table.enu('type', ['admin', 'client'])
        .defaultTo('client')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema

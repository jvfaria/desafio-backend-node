'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  async up () {
    await this.create('users', (table) => {
      table.increments().primary().unique()
      table.string('name', 45).notNullable()
      table.string('email', 45).notNullable().unique()
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

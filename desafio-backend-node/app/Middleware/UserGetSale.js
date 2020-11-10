'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Sale = use('App/Models/Sale')
class UserGetSale {
  async handle ({ request, auth, response }, next) {
    try {
      await auth.check()
      const user = await auth.getUser()
      if (user.type === 'client') {
        const sales = await Sale
          .query()
          .with('products')
          .where('user_id', user.id)
          .fetch()
        return response.status(200).json(sales)
      }
      await next()
    } catch (error) {
      return response.status(200).json(error.messages)
    }
  }
}

module.exports = UserGetSale

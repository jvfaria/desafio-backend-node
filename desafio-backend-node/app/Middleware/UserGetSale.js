'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
class UserGetSale {
  async handle ({ request, auth, response, params }, next) {
    try {
      await auth.check()
      const user = await auth.getUser()
      request.user = user
      const { from, to } = request.all()
      if (from && to) {
        request.filter = true
        request.from = from
        request.to = to
      }

      await next()
    } catch (error) {
      return response.status(200).json(error.messages)
    }
  }
}

module.exports = UserGetSale

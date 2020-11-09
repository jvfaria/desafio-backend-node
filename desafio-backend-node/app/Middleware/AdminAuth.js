'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminAuth {
  async handle ({ request, response, auth }, next) {
    try {
      const validToken = await auth.check()
      const user = await auth.getUser()
      if (!validToken || user.type !== 'admin') {
        throw new Error('Need admin privileges')
      }
      await next()
    } catch (error) {
      console.error(error)
      return response.status(401).send({ message: error.message })
    }
  }
}

module.exports = AdminAuth

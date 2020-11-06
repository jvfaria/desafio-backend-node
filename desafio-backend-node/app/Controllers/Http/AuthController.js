'use strict'

class AuthController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

  async destroy ({ response, auth }) {
    try {
      const list = await auth.getUser()
      const tokens = await auth.listTokens()
      console.log(list)
      console.log(tokens)
      return response.status(200).send({ message: 'User logged out' })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AuthController

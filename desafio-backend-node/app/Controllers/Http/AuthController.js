'use strict'
class AuthController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.withRefreshToken().attempt(email, password)
      return token
    } catch (error) {
      return response.status(401).unauthorized({
        error: error.message,
        message: 'Invalid email or password'
      })
    }
  }

  async destroy ({ request, response, auth }) {
    try {
      const refreshToken = auth.user.refreshToken
      await auth
        .authenticator('jwt')
        .revokeTokens([refreshToken], true)

      return response.status(200).send({ message: 'User logged out' })
    } catch (error) {
      console.log(error)
      return response.status(400)
        .json({
          message: 'Error trying to logout',
          error: error.message
        })
    }
  }
}

module.exports = AuthController

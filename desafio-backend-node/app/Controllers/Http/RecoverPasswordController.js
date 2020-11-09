'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')
const crypto = require('crypto')
const moment = require('moment')
const Hash = use('Hash')

class RecoverPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      user.save()

      await Mail.send(
        ['emails.recover'],
        { email, token: user.token, link: `${request.input('redirect_url')}/?token=${user.token}` },
        message => {
          message
            .to(user.email)
            .from('jvfaria015@gmail.com', 'João')
            .subject('Password Recovery')
        }
      )
      return response.status(200).send({ message: 'Email sended! Check the email in order to recover your password!' })
    } catch (error) {
      return response.status(error.status).json({
        message: 'This email is not registered',
        error: error.message
      })
    }
  }

  async update ({ request, response, auth }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)
      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      // Verify recover password token
      if (tokenExpired) {
        return response.status(401).send({ error: { message: 'Invalid token!' } })
      }
      const isSamePassword = await Hash.verify(password, user.password)

      // Verify if the user's trying to change to the same previously password
      if (isSamePassword) {
        return response.status(400).send({ message: 'Please change to another password not used before!' })
      }

      // set token to nullable and changes the password
      user.token = null
      user.token_created_at = null
      user.password = password
      user.save()
      return user
    } catch (error) {
      console.log(error)
      return response.status(400).send({ message: 'Token expired!' })
    }
  }
}

module.exports = RecoverPasswordController

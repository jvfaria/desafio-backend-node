'use strict'

const User = use('App/Models/User')
const Database = use('Database')
class UserController {
  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'email', 'password', 'type'])
      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        type: data.type ? data.type : 'client'
      })

      return response.status(200).json({
        message: 'User registered !',
        user
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error creating user',
        error: error.message

      })
    }
  }

  async index ({ request, response }) {
    try {
      const { key } = request.all()
      if (key) {
        const users =
        await Database.from('users')
          .where('name', 'like', `%${key}%`)
          .orWhere('email', `${key}`)
        return response.status(200).json(users)
      } else {
        const users = await User.all()

        return users
      }
    } catch (error) {
      return response.status(400).json({
        message: 'An error has occurred',
        error: error.message

      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const { id } = params
      const user = await User.find(id)
      if (!user) {
        return { message: 'User ID not founded' }
      }
      await user.delete()
    } catch (error) {
      return response.status(400).json({
        message: 'An error has occurred',
        error: error.message
      })
    }
  }

  async update ({ request, params, response }) {
    try {
      const { id } = params
      const body = request.only(['name', 'email', 'password'])

      const user = await User.findByOrFail('id', id)
      user.name = body.name
      user.email = body.email
      user.password = body.password

      await user.save()

      return user
    } catch (error) {
      return response.status(400).json({
        message: 'An error has occurred',
        error: error.message

      })
    }
  }
}

module.exports = UserController

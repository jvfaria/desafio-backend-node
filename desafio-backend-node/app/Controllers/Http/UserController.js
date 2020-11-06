'use strict'

const User = use('App/Models/User')
const Database = use('Database')
class UserController {
  async store ({ request }) {
    try {
      const data = request.only(['name', 'email', 'password'])
      const user = await User.create(data)

      return user
    } catch (error) {
      return error
    }
  }

  async index ({ request }) {
    try {
      const { key } = request.all()
      if (key) {
        const users =
        await Database.from('users')
          .where('name', 'like', `%${key}%`)
          .orWhere('email', `${key}`)
        return users
      } else {
        const users = await User.all()

        return users
      }
    } catch (error) {
      return error
    }
  }

  async down ({ params }) {
    try {
      const { id } = params
      const user = await User.find(id)
      if (!user) {
        return { message: 'User ID not founded' }
      }
      await user.delete()
    } catch (error) {
      return error
    }
  }

  async update ({ request, params }) {
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
      return error
    }
  }
}

module.exports = UserController

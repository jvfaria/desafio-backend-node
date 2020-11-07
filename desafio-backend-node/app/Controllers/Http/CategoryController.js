'use strict'

const Category = use('App/Models/Category')
const Database = use('Database')

class CategoryController {
  async index ({ request, response, params }) {
    try {
      const { key } = request.all()
      if (key) {
        const categories = Database
          .from('categories')
          .where('name', 'like', `%${key}%`)
        return categories
      } else {
        const categories = await Category.all()
        return categories
      }
    } catch (error) {
      return response.status(400).send({ error: { message: 'an error has occurred!' } })
    }
  }

  async store ({ request, response }) {
    try {
      const name = request.input('name')
      const category = await Category.findOrCreate({ name: name }, { name: name })
      return category
    } catch (error) {
      return response.status(400).send({ message: { error: 'an error has occurred' } })
    }
  }

  async update ({ request, response, params }) {
    try {
      const { id } = params
      const name = request.input('name')
      const category = await Category.findByOrFail('id', id)

      category.name = name
      category.save()

      return response.status(200).send({ category, message: 'Category updated!' })
    } catch (error) {
      response.status(400).send({ error: { message: 'Category id not founded' } })
    }
  }

  async destroy ({ params, response }) {
    try {
      const { id } = params

      const findCategory = await Category.findByOrFail('id', id)

      await findCategory.delete()

      return response.status(200).send({ message: 'Category deleted' })
    } catch (error) {
      return response.status(404).send({ error: { message: 'Category id not founded or the category has registered products! ' } })
    }
  }
}

module.exports = CategoryController

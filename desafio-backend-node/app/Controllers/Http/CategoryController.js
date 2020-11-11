'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request, response }) {
    try {
      const { key } = request.all()
      console.log('key')
      if (key) {
        const categories = await Category.query()
          .select('categories.id',
            'categories.name',
            'categories.created_at',
            'categories.updated_at')
          .innerJoin('products', 'products.category_id', 'categories.id')
          .distinct()
          .where('categories.name', 'like', `%${key}%`)
          .orWhere('products.name', 'like', `%${key}%`)
          .with('products')
          .fetch()

        return response.status(200).json(categories)
      }
      console.log('key else')
      const categories = await Category.query().with('products').fetch()
      return response.status(200).json(categories)
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: { message: 'an error has occurred!' } })
    }
  }

  async store ({ request, response }) {
    try {
      const name = request.input('name')
      const category = await Category.findOrCreate({ name: name }, { name: name })
      return category
    } catch (error) {
      return response.status(400).send({ error: { message: 'an error has occurred' } })
    }
  }

  async update ({ request, response, params }) {
    try {
      const { id } = params
      const name = request.input('name')
      const category = await Category.findByOrFail('id', id)

      category.name = name
      await category.save()

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

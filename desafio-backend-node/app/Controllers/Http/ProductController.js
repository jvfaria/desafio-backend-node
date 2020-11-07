'use strict'
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const Image = use('App/Models/Image')
class ProductController {
  async index ({ request, response, view }) {
    try {
      const products = Product.all()

      return products
    } catch (error) {
      return response.status(400).send({ message: { error: 'an error has occurred' } })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'stock_balance', 'image_file_name', 'category_name', 'price'])
      const category = await Category.findBy('name', data.category_name)
      if (!category) {
        return response.status(400).send({ message: { error: 'A product must belong to a category!' } })
      }
      const image = await Image.findBy('file_name', data.image_file_name)
      const product = {
        name: data.name,
        stock_balance: data.stock_balance,
        image_id: image ? image.id : null,
        category_id: category.id,
        price: data.price
      }
      const productCreated = await Product.create(product)
      return productCreated
    } catch (error) {
      console.log(error)
      return response.status(400).send({ message: { error: 'an error has occurred' } })
    }
  }

  async create ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, response }) {
    try {
      const { id } = params

      const findProducts = await Product.findByOrFail('id', id)

      await findProducts.delete()

      return response.status(200).send({ message: 'Product deleted' })
    } catch (error) {
      return response.status(404).send({ error: { message: 'Category id not founded!' } })
    }
  }
}

module.exports = ProductController

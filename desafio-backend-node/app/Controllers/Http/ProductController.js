'use strict'
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const Image = use('App/Models/Image')
class ProductController {
  async index ({ request, response, view }) {
    try {
      const products = await Product
        .query()
        .with('category')
        .fetch()

      return response
        .status(200)
        .json(products)
    } catch (error) {
      console.log(error)
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
      const productCreated = await Product.findOrCreate(product)
      return productCreated
    } catch (error) {
      return response.status(400).send({ message: { error: 'an error has occurred' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const product = await Product.findOrFail(params.id)
      const data = request.only(['name', 'image_file_name', 'category_name', 'price'])
      const category = await Category.findBy('name', data.category_name)
      if (!category) {
        return response.status(400).send({ message: { error: 'A product must belong to a category!' } })
      }
      const image = await Image.findBy('file_name', data.image_file_name)
      product.merge({
        name: data.name,
        stock_balance: product.stock_balance,
        image_id: image ? image.id : null,
        category_id: category.id,
        price: data.price
      })
      await product.save()

      return product
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: { message: 'Product id not founded!' } })
    }
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

  // Custom endpoints
  async addBalance ({ request, response, params }) {
    try {
      const product = await Product.findOrFail(params.id)
      product.stock_balance += 1
      await product.save()

      return response.status(200).json({
        message: 'Stock updated !',
        product
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: { message: 'Product id not founded' } })
    }
  }

  async removeBalance ({ request, response, params }) {
    try {
      const product = await Product.findOrFail(params.id)
      if (product.stock_balance === 0 || (product.stock_balance - 1) < 0) {
        return response.status(400).json({
          error: {
            message: 'Stock balance cannot be less than 0'
          }
        })
      }

      product.stock_balance -= 1
      await product.save()

      return response.status(200).json({
        message: 'Stock updated !',
        product
      })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: { message: 'Product id not founded' } })
    }
  }
}

module.exports = ProductController

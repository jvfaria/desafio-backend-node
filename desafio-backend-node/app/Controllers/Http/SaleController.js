'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Sale = use('App/Models/Sale')
const Database = use('Database')
class SaleController {
  async index ({ request, response, view }) {
  }

  async create ({ request, response, auth }) {
    try {
      const data = request.all()
      const user = await auth.getUser()
      const sale = await Database.transaction(async (trx) => {
        const products = await Database
          .select('*')
          .from('products')
          .whereIn('id', data.products)
        const saleObj = {
          date: new Date(),
          user_id: user.id,
          created_at: new Date(),
          updated_at: new Date()
        }
        const [sale] = await trx.insert(saleObj).into('sales')
        // --------------------------------
        products.map(async (product, index) => {
          const productStockBalance = product.stock_balance
          const newBalance = productStockBalance - data.quantity[index]
          const obj = {
            product_id: product.id,
            sale_id: parseInt(sale),
            quantity: data.quantity[index],
            total_price: product.price * data.quantity[index],
            created_at: new Date(),
            updated_at: new Date()
          }
          await Database.table('sales_products')
            .insert(obj)
          const a = await Database.table('products')
            .where('id', product.id)
            .update({ stock_balance: newBalance })
          if (a) {
            trx.rollback()
          }
        })
        return saleObj
      })
      return response.status(201)
        .json({
          sale
        })
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = SaleController

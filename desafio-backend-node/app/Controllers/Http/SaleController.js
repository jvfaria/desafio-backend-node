'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Sale = use('App/Models/Sale')
const SaleProduct = use('App/Models/SaleProduct')
const Database = use('Database')

class SaleController {
  async index ({ request, response }) {
    try {
      if (request.user.type === 'client') {
        if (request.filter) {
          const sales = await Sale
            .query()
            .with('products')
            .where('user_id', request.user.id)
            .where('created_at', '>=', request.from)
            .where('created_at', '<', request.to)
            .fetch()
          return response.status(200).json(sales)
        } else {
          const sales = await Sale
            .query()
            .with('products')
            .where('user_id', request.user.id)
            .fetch()

          return response.status(200).json(sales)
        }
      } else {
        if (request.filter) {
          const sales = await Sale
            .query()
            .with('products')
            .where('created_at', '>=', request.from)
            .where('created_at', '<', request.to)
            .fetch()
          return response.status(200).json(sales)
        } else {
          const sales = await Sale
            .query()
            .with('products')
            .fetch()
          return response.status(200).json(sales)
        }
      }
    } catch (error) {
      return response.status(400).send({
        error: error.message,
        message: 'Invalid data informed'
      })
    }
  }

  async create ({ request, response, auth }) {
    try {
      // **** DUE TO A TRANSACTION (TRX) OBJECT TIMEOUT PROBLEM
      // TO PERSIST DATA ON MY SYSTEM SQL SERVER
      // I'VE MADE THE QUERIES
      // WITHOUT TRANSACTIONS, WHICH IS NOT RECOMMENDED IN PRODUCTION.

      // const trx = await Database.beginTransaction()
      await auth.check()
      const data = request.all()
      const user = await auth.getUser()

      const sale = await Sale.create({
        date: new Date(),
        user_id: user.id,
        created_at: new Date(),
        updated_at: new Date()
      }/*, trx */)

      const products = await Database
        .select('*')
        .from('products')
        .whereIn('id', data.product)

      // his condition checks if were passed the right products ID's
      // if (data.product.length !== products.length) {
      //   await trx.rollback() // undo databases inserts
      //   returnt response.status(400).send({ error: { message: 'One or more products ID were wrong passed' } })
      // }
      const saleProductsData = products.map((product, index) => {
        const obj = {
          product_id: product.id,
          sale_id: sale.id,
          quantity: data.quantity[index],
          total_price: product.price * data.quantity[index],
          created_at: new Date(),
          updated_at: new Date()
        }
        return obj
      })
      await SaleProduct.createMany(saleProductsData /*, trx */)

      return response.status(201).json(sale) // finally returns the sale if everything gone right
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
    console.log(params)
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
    try {
      const { id } = params
      const sale = await Sale.findOrFail(id)
      await sale.delete()
    } catch (error) {
      return response.status(error.status).send({
        error: error.message,
        message: 'Sale id not founded'
      })
    }
  }
}

module.exports = SaleController

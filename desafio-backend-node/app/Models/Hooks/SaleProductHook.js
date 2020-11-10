'use strict'

const SaleProductHook = exports = module.exports = {}
const Product = use('App/Models/Product')
SaleProductHook.removeProductBalance = async (saleProductInstance) => {
  // eslint-disable-next-line camelcase
  const { product_id, quantity } = saleProductInstance
  const product = await Product.findBy('id', product_id)
  const newQuantity = product.stock_balance - quantity

  product.merge({ stock_balance: newQuantity })

  await product.save()
}

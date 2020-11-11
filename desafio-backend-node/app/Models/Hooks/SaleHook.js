'use strict'
const SaleHook = exports = module.exports = {}
const Database = use('Database')
const Product = use('App/Models/Product')
SaleHook.addProductBalance = async (saleInstance) => {
  // eslint-disable-next-line camelcase
  const pivotTable = await Database.table('sale_products')
    .select('*')
    .where('sale_id', '=', saleInstance.id)

  pivotTable.map(async (obj) => {
    const product = await Product.findBy('id', obj.product_id)
    product.stock_balance += obj.quantity
    product.save()
  })
}

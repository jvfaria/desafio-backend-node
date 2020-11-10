'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('/auth/login', 'AuthController.store')
Route.post('/users', 'UserController.store').validator('User')
Route.get('/users/:key?', 'UserController.index')
Route.post('/forgot', 'RecoverPasswordController.store')
Route.put('/forgot', 'RecoverPasswordController.update')

Route.group(() => {
  Route.post('/auth/logout', 'AuthController.destroy')

  Route.get('/products/:key?', 'ProductController.index')

  Route.get('/categories/:key?', 'CategoryController.index')

  Route.get('/sales', 'SaleController.index').middleware(['userGetSale'])
  Route.post('/sales', 'SaleController.create')
  Route.delete('/sales/:id', 'SaleController.destroy')
}).middleware(['auth'])

Route.group(() => {
  Route.post('/products', 'ProductController.store')
  Route.post('/products/balance/:id', 'ProductController.addBalance')
  Route.put('/products/:id', 'ProductController.update')
  Route.delete('/products/:id', 'ProductController.destroy')
  Route.delete('/products/balance/:id', 'ProductController.removeBalance')

  Route.post('/categories', 'CategoryController.store')
  Route.put('/categories/:id', 'CategoryController.update')
  Route.delete('/categories/:id', 'CategoryController.destroy')

  Route.delete('/users/:id', 'UserController.destroy')
  Route.put('/users/:id', 'UserController.update')

  Route.get('/images', 'ImageController.index')
  Route.post('/images', 'ImageController.store')
}).middleware(['auth', 'adminAuth'])

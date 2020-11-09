'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('/auth/login', 'AuthController.store')
Route.post('/users', 'UserController.store')
Route.get('/users/:key?', 'UserController.index')
Route.post('/forgot', 'RecoverPasswordController.store')
Route.put('/forgot', 'RecoverPasswordController.update')

Route.group(() => {
  Route.post('/auth/logout', 'AuthController.destroy')

  Route.get('/products/:key?', 'ProductController.index')

  Route.get('/categories/:key?', 'CategoryController.index')

  Route.post('/sale', 'SaleController.create')
}).middleware(['auth'])

Route.group(() => {
  Route.post('/products', 'ProductController.store')
  Route.post('/products/:id/balance', 'ProductController.addBalance')
  Route.put('/products/:id', 'ProductController.update')
  Route.delete('/products/:id', 'ProductController.destroy')
  Route.delete('/products/:id/balance', 'ProductController.removeBalance')

  Route.post('/categories', 'CategoryController.store')
  Route.put('/categories/:id', 'CategoryController.update')
  Route.delete('/categories/:id', 'CategoryController.destroy')

  Route.delete('/users/:id', 'UserController.destroy')
  Route.put('/users/:id', 'UserController.update')

  Route.get('/images', 'ImageController.index')
  Route.post('/images', 'ImageController.store')
}).middleware(['auth', 'adminAuth'])

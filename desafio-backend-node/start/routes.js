'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/users/:key?', 'UserController.index')
Route.post('/users', 'UserController.store')
Route.delete('/users/:id', 'UserController.destroy')
Route.put('/users/:id', 'UserController.update')

Route.post('/auth/login', 'AuthController.store')
Route.post('/auth/logout', 'AuthController.destroy')

Route.post('/forgot', 'RecoverPasswordController.store')
Route.put('/forgot', 'RecoverPasswordController.update')

Route.get('/categories/:key?', 'CategoryController.index')
Route.post('/categories', 'CategoryController.store')
Route.put('/categories/:id', 'CategoryController.update')
Route.delete('/categories/:id', 'CategoryController.destroy')

Route.get('/products/:key?', 'ProductController.index')
Route.post('/products', 'ProductController.store')
Route.post('/products/:id/balance', 'ProductController.addBalance')
Route.put('/products/:id', 'ProductController.update')
Route.delete('/products/:id', 'ProductController.destroy')
Route.delete('/products/:id/balance', 'ProductController.removeBalance')

Route.get('/images', 'ImageController.index')
Route.post('/images', 'ImageController.store')

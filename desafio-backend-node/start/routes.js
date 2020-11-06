'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/users', 'UserController.store')
Route.get('/users/:key?', 'UserController.index')
Route.delete('/users/:id', 'UserController.destroy')
Route.put('/users/:id', 'UserController.update')

Route.post('/auth/login', 'AuthController.store')
Route.post('/auth/logout', 'AuthController.destroy')

Route.post('/forgot', 'RecoverPasswordController.store')
Route.put('/forgot', 'RecoverPasswordController.update')

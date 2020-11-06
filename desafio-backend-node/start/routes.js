'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/users', 'UserController.store')
Route.get('/users/:key?', 'UserController.index')
Route.delete('/users/:id', 'UserController.down')
Route.put('/users/:id', 'UserController.update')
Route.post('/auth/login', 'UserController.update')
Route.post('/auth/logout', 'UserController.update')

'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|max:45|unique:users',
      password: 'required|min:6|max:45|confirmed'
    }
  }
}

module.exports = User

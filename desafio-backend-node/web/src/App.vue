<template>
  <Login />
</template>

<script>
import Login from './pages/Login.vue'
// CHANGE THE VIEW COMPONENT AND TEMPLATE COMPONENT TO RENDER THE OTHER VIEWS
// import Signup from './pages/Signup.vue'
// import NewCategory from './pages/NewCategory.vue'
// import NewProduct from './pages/NewProduct.vue'


//NewCategory
export default {
  name: 'App',
  components: {
    Login,
  }
}
</script>

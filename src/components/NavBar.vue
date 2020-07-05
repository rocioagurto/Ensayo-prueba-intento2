<template>
 <div>
  <b-navbar toggleable="lg" type="dark" variant="dark" class=" p-4">
    <b-navbar-brand href="#" class="text-uppercase"><router-link to="/" class="text-white text-decoration-none" style="font-size: 24px;">
        {{ brand }}
        </router-link></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav >
        <b-nav-item href="#" to="/" class="mr-3">Home</b-nav-item>
        <b-nav-item href="#" to="/admin" class="mr-3" v-if="isLoggedIn">Agregar Cursos</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#" to="/login" class="mr-3 mb-sm-3 mb-md-0" v-if="!isLoggedIn">Iniciar sesión</b-nav-item>
        <b-nav-item href="#" class="mr-3 mb-sm-3 mb-md-0" v-if="isLoggedIn" @click="logout">Cerrar sesión</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
 </div>
</template>

<script>
import Firebase from 'firebase';
import { mapState } from 'vuex'


export default {
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  methods: {
    logout() {
      Firebase.auth().signOut().then( () => {
        this.$router.push('login')
        this.$store.dispatch('updateUser', false)
      })
    }
  },
  computed:{
    ...mapState(['courses', 'search']),
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
       return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  }

}
</script>

<style>

</style>
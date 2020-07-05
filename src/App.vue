<template>
  <b-main id="app">
    <nav-bar :brand="'LIVE CODING'"/>
    <router-view/>
    <Footer/>
  </b-main>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'
export default {
  components:{
    NavBar,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>

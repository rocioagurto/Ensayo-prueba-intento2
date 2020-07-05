<template>
<b-container class="text-center my-5 ">
  <b-row >
    <b-col class="mx-auto" cols="12" sm="12" md="6" lg="4">
      <img class="mt-6" src="https://icons8.com/vue-static/landings/animated-icons/icons/neutral/neutral.gif" alt="">
      <p class=" titulo mt-3 text-secondary">404</p>
      <p class="text-secondary"> Not found</p>
      <p class="text-secondary">The requested URL was not found on this server.</p>
      <b-button class="mt-5"><router-link class="text-white" to="/">Volver al Home</router-link></b-button> 
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container{
  height: 77vh;
}
.titulo{
  font-size: 4rem;
}
img {
  width: 80px;
}
</style>
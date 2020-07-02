<template>
  <div class="m-5" >
  
    <b-row >
      <b-col cols="12" md="6" lg="4" v-for="c in computedCourseList" :key="c.id" >
        <b-card class=" card mb-4" >
          <b-card-img v-bind="mainProps" :src="c.data.img">
          </b-card-img>
            <b-card-body >
              <b-card-title class="text-dark"> {{ c.data.name }} </b-card-title>
              <b-card-text class="text-justify text-secondary">
                {{c.data.description}}
              </b-card-text>
            </b-card-body>
            <b-button href="#" variant="info">Ver curso</b-button>
          </b-card>
        </b-col>
      </b-row>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
   return {
    mainProps: { 
        width: 200,
        height: 260,
      }
    }
  },
  computed: {
    ...mapState(['courses']),
    computedCourseList(){
      console.log(this.courses)
      return this.courses.filter(c => {
      return c.data.name.toLowerCase()
    })
   }
  },
  created() {
   // Extraer productos de la base de datos (get)
   this.$store.dispatch('getCourses')
  },
}
</script>

<style lang="scss" scoped>
.card-body {
  padding: 15px
}
.card {
  box-shadow: $sombra;
  border: 0.2px solid rgba(212, 212, 212, 0.445)
}
</style>
<template>
  <b-container >
    <b-row >
      <b-col cols="12" sm="12" md="6" lg="4"  v-for="course in courses" :key="course.id" >
        <b-card class=" card mb-4" >
          <b-card-img v-bind="mainProps" :src="course.data.img">
          </b-card-img>
            <b-card-body >
              <b-card-title class="text-dark"> {{ course.data.name }} </b-card-title>
              <b-card-text class="text-justify text-secondary">
                {{course.data.description}}
              </b-card-text>
            </b-card-body>
            <b-button href="#" variant="danger" :to="{ name: 'course', params:{ name: course.link}}">Ver curso</b-button>
          </b-card>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
   return {
    mainProps: { 
        width: 200,
        height: 200,
      }
    }
  },
  computed: {
    ...mapState(['courses']),
  },
  methods:{
    ...mapActions(['getCourses'])

  },
  created() {
   // Extraer productos de la base de datos (get)
   this.getCourses()
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
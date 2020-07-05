<template>
  <div class="container mt-5 mb-5">
     <h1 class="text-center mb-4">Listado de Cursos </h1>
    <b-table-simple>
    <template >
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Descripcion</th>
          <th class="text-left">Imagen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.data.name}}</td>
          <td>{{ course.data.description }}</td>
          <td>{{ course.data.img }}</td>
          <td>
          <b-button variant="secondary" @click="editCourse(course.id)" ><b-icon icon="pencil"></b-icon> </b-button> 
          </td> 
          <td>
         <b-button variant="danger" @click="removeCourse(course.id)" ><b-icon icon="trash-fill"></b-icon> </b-button>
         </td>
        </tr>
      </tbody>
    </template>
  </b-table-simple>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
    ...mapState(['courses'])
   },
   methods:{
    ...mapActions(['getCourses', 'deleteCourse', 'setCurrentCourse', 'updateCourse']),
    removeCourse(id){
      let confirmation = confirm('¿Estás seguro que deseas eliminar este curso?')
      if (confirmation) {
        this.deleteCourse(id)
      }
    },
    editCourse(id){
    this.setCurrentCourse(id)
    }
   },
  created() {
   // Extraer productos de la base de datos (get)
   this.getCourses()
  },
}
</script>

<style>

</style>
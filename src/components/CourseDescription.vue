<template>
<b-container class=" text-center description mt-5 mb-5">
    <p class="text-center m-4">Detalle del Curso</p>
    <h1 class="m-4 text-center">{{currentCourse.data.name}}</h1>
    <b-row >
      <b-col class="mx-auto" cols="12" sm="12" md="6" lg="4" v-for="example in currentCourse.examples" :key="example.id"
      >
        <b-card class=" mb-4 p-1 ">
           <b-card-text> 
             <h4> {{ example.data.title }} </h4> 
             <p> {{ example.data.description }}</p>
             </b-card-text>
         

          <b-card-actions class=" d-flex justify-content-between mt-5 mb-5" >
            <div style="font-size: 2rem;" class="mr-1">

            <b-icon  icon="music-note" class="p-1 mt-3" variant="danger"></b-icon>
            </div>
            <audio class="mr-3" controls>
              <source :src="example.data.mp3" type="audio/mpeg"/>
            </audio>
            </b-card-actions>
        </b-card>
      </b-col>
    </b-row>
        <b-button class="mx-auto mt-3 " href="#" to="/" variant="danger" >Volver al Home</b-button>
  </b-container>
  
</template>

<script>
import { mapState} from "vuex";

export default {
  computed: {
    ...mapState(["courses"]),
    currentCourse(){
      return this.courses.find(course => {
        return course.link == this.$route.params.name;
      })
    }
  },

};
</script>

<style lang="scss" scoped>
.card-body {
  padding: 15px
}
.card {
  box-shadow: $sombra;
  border: 0.2px solid rgba(212, 212, 212, 0.445)
}
.description{
  height: auto;
}
</style>
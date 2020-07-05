<template>
  <div class="container mt-5 text-white">
    <b-container>
      <b-row>
        <b-form cols="12" md="8" class="m-auto form pt-4 pb-4 pr-2 pl-2 bg-dark" style="width: 400px">
          <div class="container titulo">
            <h2 class="mb-3 text-center mt-3">Formulario ingreso cursos</h2>
          </div>
          <div class=" container pb-3 ">
            <b-label> Nombre: </b-label>
            <b-form-input class="mt-2" :value="currentCourse.data.name" @input="updateName" placeholder="Nombre del curso" type="text" ></b-form-input>
          </div>
          <div class="container pb-3">
            <b-label> URL: </b-label>
            <b-form-input class="mt-2" :value="currentCourse.data.img" @input="updateImg" placeholder="URL de la imagen" type="text"></b-form-input>
          </div>
          <div class="container pb-2">
            <b-label> Descripcion: </b-label>
            <b-form-textarea class="mt-2" :value="currentCourse.data.description" placeholder="Descripcion del curso"  @input="updateDescription"></b-form-textarea>
          </div>
          <div class=" container text-center ">
            <b-button  variant="danger" class="mt-3 mb-2 " @click="submitForm"> {{ !!currentCourse.id ? 'Actualizar':'Ingresar Curso'}} </b-button>
          </div>
        </b-form>
     </b-row>
    </b-container>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed:{
  ...mapState(['currentCourse'])
},
 methods: {
   ...mapActions(['updateName', 'updateImg', 'updateDescription', 'postCourse','updateCourse']),
   submitForm(){
    if(this.currentCourse.id){
      this.updateCourse(this.currentCourse.id)
     }else{
      this.postCourse()
     }
   }
 },
}
</script>

<style lang="scss" scoped>
.form{
  width: $ancho;
  border-radius: $border;
   box-shadow: $sombra;
}
</style>
<template>
 <div>
  <div class="mt-5">
   <div class="field text-center mb-3 text-danger">
        <!-- Mensaje en caso de datos incorrectos -->
    <span v-if="formHasErrors" class="has-text-danger">
    <i class="mdi mdi-alert "></i>
     Usuario o Contraseña incorrectos, intente nuevamente.
    </span>
   </div>
   <b-form class="container form  p-4 " @reset="onReset" v-if="show">
   <!-- Titulo formulario -->
    <h1 class="text-center">Bienvenid@!</h1>
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input id="input-1" data-testId="form-user" v-model="credentials.email" type="email" required
            placeholder="Enter email">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-input type="password" id="text-password" aria-describedby="password-help-block" placeholder="Password"
            v-model="credentials.password">
          </b-input>
         
        </b-form-group>


        <div class="d-flex justify-content-between mt-5">
          <b-button variant="dark"  v-b-modal.modal-1 @click="login">Iniciar Sesión</b-button>
          
          <b-button type="reset" variant="info">Reset</b-button>
        </div>

      </b-form>
  


  </div>
 </div>
</template>

<script>
import Firebase from 'firebase'
export default {
  data() {
      return {
        credentials: {
          email: '',
          password: '',

        },
        formHasErrors: false,
        show: true,
     
        
        
      }
    },
    methods: {
      //Boton reset
      onReset(e) {
        e.preventDefault()
        //Restablece valores del formulario
        this.credentials.email = ''
        this.credentials.password = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      //Boton iniciar sesion
      login(e) {
        e.preventDefault()
        this.formHasErrors = this.credentials.email === '' || this.credentials.password === ''
        if (!this.formHasErrors) {
          Firebase.auth()
          //Iniciar sesion con correo electronico y contraseña
            .signInWithEmailAndPassword(
              this.credentials.email,
              this.credentials.password
            )
            .then(() => {
              let user = this.credentials.email
              this.$store.dispatch('updateUser', user)
              alert(`Bienvenida, ${user}`) 
              this.$router.push('/')
            })
            .catch(() => {
              alert('Usuario no autenticado')
            })
        }
      }
    },

}
</script>

<style lang="scss" scoped>
.form{
  width: $ancho;
  background: $primary;
  box-shadow: $sombra;
}
</style>


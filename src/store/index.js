import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//  import Firebase from 'firebase'

Vue.use(Vuex)


const baseURL = 'https://us-central1-ensayo-prueba.cloudfunctions.net/courses'
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
function emptyCourse(){
  return{
    id:null,
    data:{
      name: '',
      description: '',
      img: '',
    },
    examples: {},
  }
}
export default new Vuex.Store({
  state: {
    courses: [],
    loading: false,
    //usuario actual
    currentUser: getFromStorage('user') || undefined,
    // curso atual / curso vacío
    currentCourse: emptyCourse(),
    edit: false,
    search: ''
  },


  mutations: {
    // Cargando cursos
    LOADING_COURSES(state){
      state.loading = !state.loading
    },
    // LOADING_COURSES_OFF(state){
    //   state.loading = false
    // },
    //  Obtener cursos
    GET_COURSES(state, courses) {
      state.courses = []
      courses.forEach(course => {
        course.link = course.data.name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 -]/, "")
          .replace(/\s/g, "-");
        state.courses.push(course)
      })
    },
    // Actualizar usuario
    UPDATE_CURRENTUSER(state, user) {
    state.currentUser = user
    setInStorage('user', user)
    },
  },


  actions: {
    updateUser({commit}, user){
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURRENTUSER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    // Obtener cursos, obtener datos desde la api
    getCourses({commit}){
      commit('LOADING_COURSES')
      //carga o no carga info
      axios.get(`${baseURL}/courses`, {headers: {"Content-type": "text/plain"}})
      .then((response)=> {
        commit('GET_COURSES', response.data)
      })
      .catch(function(error) {
          console.log(error);
      });
  },
  
 
  },
   getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser
  }
})
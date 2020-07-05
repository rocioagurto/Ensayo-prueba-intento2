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
    LOADING_COURSES(state){state.loading = true},
    LOADING_COURSES_OFF(state){state.loading = false},
    // Actualizar usuario
    UPDATE_CURRENTUSER(state, user) {state.currentUser = user, setInStorage('user', user)},

    SET_EMPTY_COURSE (state) {
      state.currentCourse.id = null
      const empty = emptyCourse()
      Object.keys(empty.data).forEach(key => {
        state.currentCourse.data[key] = empty.data[key]
      })
    },
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
    UPDATE_NAME(state, name){state.currentCourse.data.name = name},
    UPDATE_IMG(state, img){state.currentCourse.data.img = img},
    UPDATE_DESCRIPTION(state, description){state.currentCourse.data.description = description},
    SET_CURRENT_COURSE(state, course){ state.currentCourse = course }, 
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
        commit('SET_EMPTY_COURSE')
        commit('LOADING_COURSES_OFF')
      })
      .catch(function(error) {
          console.log(error);
      });
    },
    postCourse({ dispatch, state}){
      axios.post(`${baseURL}/course`, state.currentCourse.data)
      .then(() =>{
        dispatch('getCourses')
      })
    },
    deleteCourse({ dispatch }, id){
      axios.delete(`${baseURL}/course/${id}`)
        .then(() => {
          dispatch('getCourses')
      })
    },
    setCurrentCourse({ commit, getters }, id){
      // Buscar si tenemos el paciente en la lista actual
      let targetCourse = getters.searchCourseById(id)
      //Si lo encuentra, actualizar el currentCourse con ese paciente
      if(targetCourse){
        commit('SET_CURRENT_COURSE', targetCourse)
      } else {
        //Si no, hacer la llamada a la axios
        axios.get(`${baseURL}/course/${id}`)
        .then((response) => {
          commit('SET_CURRENT_COURSE', response.data)
        })
      }
    },
    updateCourse({ state, dispatch }, id) {
      axios.put(`${baseURL}/course/${id}`, state.currentCourse.data)
      .then(() => {
        dispatch('getCourses')
      })
    },
    updateName({commit}, name){
      commit('UPDATE_NAME', name)
    },
    updateImg({commit}, img){
      commit('UPDATE_IMG', img)
    },
    updateDescription({commit}, description){
      commit('UPDATE_DESCRIPTION', description)
    },
  },
   getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    searchCourseById: (state) => (id) =>{
      return state.courses.find(course => course.id === id)
    }
  }
})

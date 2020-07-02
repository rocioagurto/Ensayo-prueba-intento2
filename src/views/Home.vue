<template>
  <b-main>
    <header-home/>
    <cards-courses-list/>
  </b-main>
</template>

<script>
import CardsCoursesList from '../components/CardsCoursesList'
import HeaderHome from '../components/HeaderHome'



export default {
  name: 'Home',
  components: {
     CardsCoursesList,
     HeaderHome

  }
}
</script>

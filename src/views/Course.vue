<template>
  <b-container>
    <course-description/>
  </b-container>
</template>

<script>
import CourseDescription from '../components/CourseDescription'
export default {
    components: {
        CourseDescription
    }
}
</script>

<style lang="scss" scoped>
.container{
  height: auto;
  margin-bottom: 25rem;
}

</style>
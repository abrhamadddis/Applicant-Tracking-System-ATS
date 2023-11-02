<template>
  <div>
    <navBar/>
  </div>
  <RouterView />
</template>

<script>
  // import login from './components/login.vue'
  // import login from './components/login.vue';

  import login from './components/login.vue';
  import navBar from './components/nav.vue';

  import { RouterLink, RouterView } from 'vue-router';

  export default {

    name:'App',
    components: {
      login,
      navBar,
    }
    
  }
</script>

<style lang="scss" scoped>

</style>
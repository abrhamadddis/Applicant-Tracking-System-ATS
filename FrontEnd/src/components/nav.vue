<template>
  <div class="container flex justify-between item- mx-auto pt-4 mt-5">
    <div>
      <img class="w-48" src="../assets/MMCYTech.png" alt="" />
    </div>

    <div class=" flex items-center">
      <router-link
        class="text-secondary text-xl font-sans font-medium py-1 px-2 hover:text-primary rounded-md mr-5"
        to="/"
        >Home</router-link
      >

      <router-link
        class="text-secondary text-xl font-sans font-medium py-1 px-2 hover:text-primary rounded-md"
        to="/jobs"
        >Job List</router-link
      >
      <router-link
        class="text-secondary text-xl font-sans font-medium py-1 px-2 hover:text-primary rounded-md"
        to="#"
        >Services</router-link
      >
      <router-link
        class="text-secondary text-xl font-sans font-medium py-1 px-2 hover:text-primary rounded-md"
        to="#"
        >Careers</router-link
      >
      <router-link
        class="text-secondary text-xl font-sans font-medium py-1 px-2 hover:text-primary rounded-md"
        to="#"
        >Contact Us</router-link
      >
      
    </div>

    <div>
      <RouterLink
        v-show="!userLoggedinLoggedOut"
        class="md:block p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-brightRedLight"
        to="/login"
        >LogIn</RouterLink
      >

      <RouterLink
        v-show="userLoggedinLoggedOut"
        @click="logOutUser"
        class="md:block p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-brightRedLight"
        to="/"
        >LogOut</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/useAuth'

export default {
  name: 'navBar',
  data() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
    logOutUser() {
      const authStore = useAuthStore()
      authStore.logOut()
    }
  },
  computed: {
    userLoggedinLoggedOut() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  }
}
</script>

<style lang="scss" scoped></style>

import { createRouter, createWebHistory } from 'vue-router'
import jobListing from '../views/jobListing.vue'
import login from '../components/login.vue'
import home from '../views/home.vue'
import { useAuthStore } from '../stores/useAuth'

const protectedEnd = (to, from, next) => {
  const authStore = useAuthStore()
  if(authStore.isAuthenticated){
    next()
  }else{
    next("/login")
  }

}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

        path: '/',
        name: 'home',
        component: home
    },
    {

      path: '/jobs',
      name: 'jobs',
      component: jobListing,
      beforeEnter: protectedEnd
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router

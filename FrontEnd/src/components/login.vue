<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="flex flex-col items-center justify-center bg-gradient-to-t from-gradiantFrom to-gradiantTo h-1/3 py-48 rounded-2xl w-1/4"
    >
      
      <h2 class="text-secondary text-3xl font-sans font-midium pt-4">Login</h2>
      <Form @submit.prevent="submit" class="w-full px-12 pt-12 pb-4">
        <label for="email" class="text-secondary text-sm font-sans font-medium">Email</label>

        <input
          type="email"
          id="username "
          v-model="formValues.email"
          class="w-full rounded-md py-1 px-2 focus:outline-none focus:border-2"
        />
        <div class="text-red-600 pl-2" v-if="emailError">{{ emailError }}</div>

        <label for="password" class="text-secondary text-sm font-sans font-medium">Password</label>

        <input
          type="password"
          id="password"
          v-model="formValues.password"
          class="w-full rounded-md py-1 px-2 focus:outline-none focus:border-2"
        />
        <div class="text-red-600 pl-2" v-if="passwordError">{{ passwordError }}</div>
        

        <button
          class="w-full mt-12 bg-primary text-white text-lg font-sans py-2 rounded-md font-medium"
        >
          Sign in
        </button>
      </Form>
      <div class="text-red-600" v-if="incorrectCredentials">{{ incorrectCredentials }}</div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/useAuth'
import axios from 'axios'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  data() {
    return {
      formValues: {
        email: '',
        password: ''
      },
      emailError: '',
      passwordError: '',
      incorrectCredentials: '',
     
    }
  },

  methods: {
    async submit() {
      
      if (!this.formValues.email) {
        this.emailError = 'please enter your email'
        setTimeout(() => {
          this.emailError = ''
        }, 4000)
      }
      if (!this.formValues.password) {
        this.passwordError = 'please enter your password'
        setTimeout(() => {
          this.passwordError = ''
        }, 4000)
      }
      if (!this.emailError && !this.passwordError) {
        const authStore = useAuthStore()
        try{
            const response= await axios.post('http://localhost:8001/auth/users/login', this.formValues)
            authStore.setToken(response.data.token);
            authStore.setUser(response.data.name);
              
            this.$router.push('/jobs')
          
        }catch(error){
          console.log(error)
          this.incorrectCredentials = error.response.data.message
          if (this.incorrectCredentials) {
            setTimeout(() => {
              this.incorrectCredentials = "";
            }, 4000);
          }
        }
        
      }
      
    }
  }
}
</script>

<style lang="scss" scoped></style>

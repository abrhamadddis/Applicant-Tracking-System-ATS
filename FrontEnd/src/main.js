import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/useAuth';
import router from './router'
import './assets/style.css'
// import { required, email, minLength } from 'vuelidate/lib/validators'
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
const authStore = useAuthStore(pinia);
authStore.saved()
app.mount('#app')
// createApp(App).use(router).use(createPinia()).mount('#app')
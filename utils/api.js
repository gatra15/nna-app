import axios from 'axios'
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const api = axios.create({
  baseUrl: 'http://nna-api.test/api',
  headers: { 'Content-Type' : 'application/json'},
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if(authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response?.status === 401) {
      const authStore = useAuthStore()
      const router = useRouter()

      authStore.logout()
      router.push('/auth/login')
    }
    return Promise.reject(error)
  }
)

export default api;
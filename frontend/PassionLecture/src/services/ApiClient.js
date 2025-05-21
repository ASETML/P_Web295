import axios from 'axios'
import router from './router'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if ((err.response && err.response.status >= 500) || err.code === 'ERR_CONNECTION_REFUSED') {
      router.push('/erreur-serveur')
    }
    return Promise.reject(err)
  },
)
export default apiClient

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
})
export default {
  getCategory() {
    return apiClient.get('/categories')
  },
}

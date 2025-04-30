import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTc0NTk5NDM0MiwiZXhwIjoxNzc3NTUxOTQyfQ.xOabDRXaFGDLywQONTtS9Hd3B4_v7AwYv-CWum4uGvM',
  },
})

export default {
  getLivreFromCategorie(id) {
    return apiClient.get('/categories/' + id + '/livres')
  },
  getCategories() {
    return apiClient.get('/categories')
  },
  getLastLivres(limit) {
    return apiClient.get('/livres/' + '?limit=' + limit)
  },
}

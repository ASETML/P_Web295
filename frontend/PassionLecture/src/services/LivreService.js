import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
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

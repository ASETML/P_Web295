import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})

export default {
  getLivreFromCategorie(id) {
    return apiClient.get('/categories/' + id + '/livres')
  },
  getLastLivres(limit) {
    return apiClient.get('/livres/' + '?limit=' + limit)
  },
  getLivre(id) {
    return apiClient.get('/livres/' + id)
  },
}

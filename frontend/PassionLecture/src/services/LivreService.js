import apiClient from './ApiClient'

export default {
  getLivreFromCategorie(id) {
    //return apiClient.get('/categories/' + id + '/livres')
    return apiClient.get('/livres/?cat=' + id + '')
  },
  getLastLivres(limit) {
    return apiClient.get('/livres/' + '?limit=' + limit)
  },
  getLivre(id) {
    return apiClient.get('/livres/' + id)
  },
  getAllLivres() {
    return apiClient.get('/livres/')
  },
}

import apiClient from './ApiClient'

export default {
  getUtilisateurId() {
    return apiClient.get('/utilisateur/')
  },
  getUtilisateurById(id) {
    return apiClient.get('/utilisateur/' + id)
  },
}

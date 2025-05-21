import apiClient from './ApiClient'

export default {
  getUtilisateurId() {
    return apiClient.get('/utilisateur/')
  },
}

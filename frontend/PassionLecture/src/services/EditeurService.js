import apiClient from './ApiClient'

export default {
  getEditeur() {
    return apiClient.get('/editeurs')
  },
  postEditeur(editeur) {
    return apiClient.post("/editeurs", {nom: editeur})
  }
}

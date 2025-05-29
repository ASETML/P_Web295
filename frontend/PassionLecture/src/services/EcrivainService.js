import apiClient from './ApiClient'

export default {
  getEcrivain() {
    return apiClient.get('/ecrivains')
  },
  postEcrivain(nom, prenom) {
    return apiClient.post("/ecrivains", {nom: nom, prenom: prenom})
  }
}

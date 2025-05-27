import apiClient from './ApiClient'

export default {
  postCommentaires(livre_id, commentaire) {
    return apiClient.post('/livres/' + livre_id + '/commentaire', {
      commentaire: commentaire,
    })
  },
  getCommentaires(id) {
    return apiClient.get('/livres/commentaire/' + id)
  },
}

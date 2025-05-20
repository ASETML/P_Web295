import apiClient from './ApiClient'

export default {
  postCommentaires(livre_id, commentaire, user_id) {
    return apiClient.post('/livres/' + livre_id + '/commentaire', {
      commentaire: commentaire,
      utilisateur_fk: user_id,
    })
  },
}

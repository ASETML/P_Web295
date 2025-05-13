import apiClient from './ApiClient'

export default {
  postCommentaires(livre_id, commentaire, user_id) {
    console.log(livre_id, commentaire, user_id)
    apiClient.post('/livres/' + livre_id + '/commentaire', {
      commentaire: commentaire,
      utilisateur_fk: user_id,
    })
  },
}

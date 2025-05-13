import apiClient from './ApiClient'

export default {
  PostInscription(pseudo, mdp) {
    return apiClient.post('/inscription', {
      mot_de_passe: mdp,
      pseudo: pseudo,
    })
  },
}

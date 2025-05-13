import apiClient from './ApiClient'

export default {
  PostConnexion(pseudo, mdp) {
    return apiClient.post('/connexion', {
      mot_de_passe: mdp,
      pseudo: pseudo,
    })
  },
}

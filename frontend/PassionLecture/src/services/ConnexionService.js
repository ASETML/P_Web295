import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})
export default {
  PostConnexion(pseudo, mdp) {
    return apiClient.post('/connexion', {
      mot_de_passe: mdp,
      pseudo: pseudo,
    })
  },
}

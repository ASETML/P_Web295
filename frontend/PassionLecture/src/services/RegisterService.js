import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})
export default {
  PostInscription(pseudo, mdp) {
    return apiClient.post('/inscription', {
      mot_de_passe: mdp,
      pseudo: pseudo,
    })
  },
}

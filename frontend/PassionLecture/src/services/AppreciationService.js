import apiClient from './ApiClient'

export default {
  postAppreciation(livre_id, note) {
    return apiClient.post('/appreciations/' + livre_id, {
      note: note,
    })
  },
  getAppreciation(livre_id) {
    return apiClient.get('/appreciations/' + livre_id)
  },
}

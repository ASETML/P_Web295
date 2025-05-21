import apiClient from './ApiClient'

export default {
  postAppreciation(livre_id, note) {
    return apiClient.put('/appreciations/' + livre_id, {
      note: note,
    })
  },
  getAppreciation(livre_id) {
    return apiClient.get('/appreciations/' + livre_id)
  },
  delAppreciation(livre_id) {
    return apiClient.delete('/appreciations/' + livre_id)
  },
}

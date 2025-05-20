import apiClient from './ApiClient'

export default {
  getEcrivain() {
    return apiClient.get('/ecrivains')
  },
}

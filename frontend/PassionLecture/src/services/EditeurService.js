import apiClient from './ApiClient'

export default {
  getEditeur() {
    return apiClient.get('/editeurs')
  },
}

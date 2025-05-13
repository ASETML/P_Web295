import apiClient from './ApiClient'

export default {
  getCategory() {
    return apiClient.get('/categories')
  },
}

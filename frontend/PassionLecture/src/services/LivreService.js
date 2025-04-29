import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': 'Allow',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTc0NTkzNzAzOSwiZXhwIjoxNzc3NDk0NjM5fQ.vbXJFOQdD3kTvvkQPBlLxIDyHuwLTllEtLykLn7zQ4I',
  },
})

export default {
  getLivreFromCategorie(id) {
    return apiClient.get('/categories/' + id + '/livres')
  },
}

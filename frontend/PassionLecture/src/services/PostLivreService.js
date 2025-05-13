import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})
export default {
  postLivre(titre, nombre_pages, extrait, resume, annee_edition, imageFile) {
    const dataObject = {
      titre,

      nombre_pages,
      extrait,
      resume,
      annee_edition,
      utilisateur: 11,
      categorie: 10,
      editeur: 11,
      ecrivain: 11,
    }

    const formData = new FormData()
    formData.append('data', JSON.stringify(dataObject))
    formData.append('file', imageFile)
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }
    return apiClient.post('/livres/', formData)
  },
}

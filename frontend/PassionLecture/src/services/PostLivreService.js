import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
})
export default {
  postLivre(
    titre,
    nombre_pages,
    extrait,
    resume,
    annee_edition,
    imageFile,
    categorie,
    editeur,
    ecrivain,
  ) {
    const dataObject = {
      titre: titre,
      nombre_pages: nombre_pages,
      extrait: extrait,
      resume: resume,
      annee_edition: annee_edition,
      utilisateur_fk: 11,
      categorie_fk: categorie,
      editeur_fk: editeur,
      ecrivain_fk: ecrivain,
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

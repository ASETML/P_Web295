import apiClient from './ApiClient'

export default {
  getLivreFromCategorie(id) {
    //return apiClient.get('/categories/' + id + '/livres')
    return apiClient.get('/livres/?cat=' + id + '')
  },
  getLastLivres(limit) {
    return apiClient.get('/livres/' + '?limit=' + limit)
  },
  getLivresUser(id) {
    console.log(id)
    return apiClient.get('/livres/?user=' + id)
  },
  getLivre(id) {
    return apiClient.get('/livres/' + id)
  },
  getAllLivres() {
    return apiClient.get('/livres/')
  },
  delLivre(id) {
    return apiClient.delete('/livres/' + id)
  },
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
  updateLivre(livre, livre_id) {
    const dataObject = {
      titre: livre.titre,
      nombre_pages: livre.nombre_pages,
      extrait: livre.extrait,
      resume: livre.resume,
      annee_edition: livre.annee_edition,
      categorie_fk: livre.categorie,
      editeur_fk: livre.editeur,
      ecrivain_fk: livre.ecrivain,
    }
    return apiClient.put('/livres/' + livre_id, dataObject)
  },
}

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
  updateLivre(titre, nombre_pages, extrait, resume, annee_edition, categorie_fk, editeur_fk, ecrivain_fk, livre_id) {
    const dataObject = {
      titre: titre,
      nombre_pages: nombre_pages,
      extrait: extrait,
      resume: resume,
      annee_edition: annee_edition,
      categorie_fk: categorie_fk,
      editeur_fk: editeur_fk,
      ecrivain_fk: ecrivain_fk,
    }
    return apiClient.put('/livres/' + livre_id, dataObject)
  },
}

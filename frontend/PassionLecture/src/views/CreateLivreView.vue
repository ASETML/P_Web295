<template>
  <div class="container">
    <h1>je crée des livres !</h1>
    <livre-form :livre="{}" @send-form="creationLivre" image="true" action="creer"></livre-form>
  </div>
</template>
<script setup>
import router from '@/router'
import LivreService from '@/services/LivreService'
import CategoryService from '@/services/CategoryService'
import EditeurService from '@/services/EditeurService'
import EcrivainService from '@/services/EcrivainService'

import LivreForm from '@/components/LivreForm.vue'
const creationLivre = (data) => {
  if (data.imageFile.value) {
    LivreService.postLivre(
      data.titre.value,
      parseInt(data.nombrePage.value),
      data.extrait.value,
      data.resume.value,
      parseInt(data.anneeEdition.value),
      data.imageFile.value,
      parseInt(data.selectionCat.value),
      parseInt(data.selectionEdi.value),
      parseInt(data.selectionEcr.value),
      console.log(data.selectionCat),
    )
      .then((response) => {
        console.log('Livre créé avec succès', response.data)
        router.push('search')
      })
      .catch((error) => {
        console.error('Erreur lors de la création du livre', error)
      })
  } else {
    console.error('Aucune image sélectionnée')
  }
}
</script>

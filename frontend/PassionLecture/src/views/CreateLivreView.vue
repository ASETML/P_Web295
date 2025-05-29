<template>
  <div class="container">
    <h1>je crée des livres !</h1>
    <livre-form :livre="{}" @send-form="creationLivre" image="true" action="creer"></livre-form>
    <p v-if="error" class="error">Aucune image sélectionnée</p>
  </div>
</template>
<script setup>
import router from '@/router'
import LivreService from '@/services/LivreService'
import CategoryService from '@/services/CategoryService'
import EditeurService from '@/services/EditeurService'
import EcrivainService from '@/services/EcrivainService'
import { ref } from 'vue'

const error = ref(false)

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
    ).then((response) => {
      error.value = false
      router.push('search')
    })
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

<template>
  <div class="container">
    <h1>Modification du livre:</h1>
    <!--TODO: Livre en props-->
    <livre-form v-if="livre" @send-form="updateLivre" :livre="livre"></livre-form>
  </div>
</template>
<script setup>
import router from '@/router'
import LivreService from '@/services/LivreService'
import CategoryService from '@/services/CategoryService'
import EditeurService from '@/services/EditeurService'
import EcrivainService from '@/services/EcrivainService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import LivreForm from '@/components/LivreForm.vue'

//Fetch livres details
const livre = ref(null)
const route = useRoute()
const id = route.params.id

const fetchLivre = async () => {
  LivreService.getLivre(id).then((res) => {
    livre.value = res.data.data
    console.log(livre.value)
  })
}

onMounted(async () => {
  await fetchLivre()
})

const updateLivre = (data) => {
  if (data.imageFile.value) {
    LivreService.updateLivre(
      data.livre_id,
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
        console.log('Livre mis à jour avec succès', response.data)
        router.push('search')
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du livre', error)
      })
  } else {
    console.error('Aucune image sélectionnée')
  }
}
</script>

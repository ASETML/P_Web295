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
  const livre = {
    titre: data.livre_id,
    nombre_page: parseInt(data.nombrePage.value),
    extrait: data.extrait.value,
    resume: data.resume.value,
    annee_edition: parseInt(data.anneeEdition.value),
    categorie_fk: parseInt(data.selectionCat.value),
    editeur_fk: parseInt(data.selectionEdi.value),
    ecrivain_fk: parseInt(data.selectionEcr.value),
  }
  console.log(livre)

  LivreService.updateLivre(livre, data.livre_id)
    .then((response) => {
      console.log('Livre mis à jour avec succès', response.data)
      router.push('search')
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour du livre', error)
    })
}
</script>

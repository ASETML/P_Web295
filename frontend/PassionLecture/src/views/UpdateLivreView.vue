<template>
  <div class="container">
    <h1>Modification du livre:</h1>
    <!--TODO: Livre en props-->
    <livre-form v-if="livre" @send-form="updateLivre" :livre="livre" action="modifier"></livre-form>
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
  })
}

onMounted(async () => {
  await fetchLivre()
})

const updateLivre = (data) => {
  LivreService.updateLivre(
    data.titre.value,
    parseInt(data.nombrePage.value),
    data.extrait.value,
    data.resume.value,
    parseInt(data.anneeEdition.value),
    parseInt(data.selectionCat.value),
    parseInt(data.selectionEdi.value),
    parseInt(data.selectionEcr.value),
    data.livre_id.value,
  ).then((response) => {
    router.push('search')
  })
}
</script>

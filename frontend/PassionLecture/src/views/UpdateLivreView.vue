<template>
  <div class="container">
    <h1>je crée des livres !</h1>
    <livre-form @send-form="creationLivre"></livre-form>
  </div>
</template>
<script setup>
import router from '@/router'
import PostLivreService from '@/services/PostLivreService'
import { onMounted, ref } from 'vue'
import CategoryService from '@/services/CategoryService'
import EditeurService from '@/services/EditeurService'
import EcrivainService from '@/services/EcrivainService'

import LivreForm from '@/components/LivreForm.vue'

const selectionCat = ref('')
const selectionEdi = ref('')
const selectionEcr = ref('')
const titre = ref('')
const extrait = ref('')
const nombrePage = ref('')
const categories = ref(null)
const anneeEdition = ref('')
const resume = ref('')
const imageFile = ref(null)
const imagePreview = ref(null)
const editeurs = ref(null)
const ecrivains = ref(null)
const handleImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const creationLivre = () => {
  if (imageFile.value) {
    PostLivreService.postLivre(
      titre.value,
      parseInt(nombrePage.value),
      extrait.value,
      resume.value,
      parseInt(anneeEdition.value),
      imageFile.value,
      parseInt(selectionCat.value),
      parseInt(selectionEdi.value),
      parseInt(selectionEcr.value),
      console.log(selectionCat),
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
const getcategory = async () => {
  CategoryService.getCategory()
    .then((res) => {
      categories.value = res.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}
const getEditeur = async () => {
  EditeurService.getEditeur()
    .then((res) => {
      editeurs.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
const getEcrivain = async () => {
  EcrivainService.getEcrivain()
    .then((res) => {
      ecrivains.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
onMounted(async () => {
  await getcategory()
  await getEditeur()
  await getEcrivain()
})
</script>

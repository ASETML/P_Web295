<template>
  <div v-if="user">
    <h1>page du compte de {{ user.pseudo }}</h1>
    <h3>Nombre de livres ajoutés : {{ user.nbrLivres }}</h3>
    <h3>Date d'inscription : {{ user.date_inscription }}</h3>
  </div>
  <h1 v-else>Utilisateur introuvable</h1>
</template>
<script setup>
import UtilisateurService from '@/services/UtilisateurService'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id

const user = ref(null)

const fetchUser = async () => {
  UtilisateurService.getUtilisateurById(id).then((response) => {
    console.log(response.data.data)
    user.value = response.data.data[0]
  })
}
watch(() => {
  fetchUser()
})
onMounted(() => {
  fetchUser()
})
</script>
<style></style>

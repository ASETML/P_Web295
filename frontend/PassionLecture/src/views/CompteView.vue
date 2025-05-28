<template>
  <div class="container">
    <h1>Compte</h1>
    <h2>{{ User?.pseudo }}</h2>

    <div class="onglets">
      <h2 :class="{ 'active-tab': TabLivre }" @click="TabLivre = true">Livre</h2>
      <h2 :class="{ 'active-tab': !TabLivre }" @click="TabLivre = false">Commentaire</h2>
    </div>

    <div class="livre" v-if="TabLivre">
      <p v-if="livres && !livres.length > 0">Pas de livres</p>
      <div v-for="livre in livres" :key="livre.id" class="livre-item">
        <Livre :livre="livre" class="livre" />
        <delete-button :livre="livre" @delete="fetchIdUser"></delete-button>
        <router-link :to="{ name: 'updateLivre', params: { id: livre.livre_id } }"
          >Mettre à jour ce livre</router-link
        >
      </div>
    </div>
    <div class="commantaire" v-if="!TabLivre">
      <p v-if="!commentaires.length > 0">Pas de commentaires</p>
      <p v-for="commentaire in commentaires" :key="commentaire.id" class="commentaire">
        {{ commentaire.commentaire }}
      </p>
    </div>
  </div>
</template>
<script setup lang="js">
import UtilisateurService from '@/services/UtilisateurService'
import LivreService from '@/services/LivreService'
import { onMounted, ref, watch } from 'vue'
import Livre from '@/components/Livre.vue'
import CommentaireService from '@/services/CommentaireService'
import DeleteButton from '@/components/DeleteButton.vue'

const TabLivre = ref(true)
const idUser = ref('')
const livres = ref(null)
const User = ref(null)
const commentaires = ref(null)
const fetchIdUser = async () => {
  UtilisateurService.getUtilisateurId().then(async (res) => {
    idUser.value = res.data
    await fetchUser(idUser.value)
    await fetchCom(idUser.value)
    LivreService.getLivresUser(idUser.value)
      .then((res) => {
        livres.value = res.data.data
        console.log(idUser.value)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
const fetchCom = async (id) => {
  CommentaireService.getCommentaires(id)
    .then((res) => {
      commentaires.value = res.data.data
      console.log(commentaires.value)
    })
    .catch((err) => {
      console.log(err)
    })
}
const fetchUser = async (id) => {
  console.log(id)
  UtilisateurService.getUtilisateurById(id)
    .then((res) => {
      User.value = res.data.data
      console.log(User.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(async () => {
  await fetchIdUser()
})
</script>
<style scoped>
/* Conteneur des onglets */
.onglets {
  display: flex;
  gap: 8px;
  margin-bottom: -1px;
}

/* Styles de chaque onglet */
.onglets h2 {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  font-size: 16px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

/* Hover */
.onglets h2:hover {
  background-color: #e0e0e0;
}

/* Onglet actif */
.active-tab {
  background-color: #ffffff;
  border-bottom: 1px solid white;
  font-weight: bold;
}

/* Contenu visible sous les onglets */
.livre,
.commantaire {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: white;
  border-radius: 0 0 8px 8px;
  margin-top: 0;
}

.livre-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

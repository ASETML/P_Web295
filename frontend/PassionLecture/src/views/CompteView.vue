<template>
  <div class="container">
    <h1>Compte</h1>
    <h2>{{ User?.pseudo }}</h2>

    <div class="onglets">
      <h2 :class="{ 'active-tab': TabLivre }" @click="TabLivre = 1">Livre</h2>
      <h2 :class="{ 'active-tab': !TabLivre }" @click="TabLivre = 2">Commentaire</h2>

      <h2 :class="{ 'active-tab': !TabLivre }" @click="TabLivre = 3" v-if="User?.admin">Admin</h2>
    </div>

    <div class="livre" v-if="TabLivre == 1">
      <p v-if="livres && !livres.length > 0">Pas de livres</p>
      <div v-for="livre in livres" :key="livre.id" class="livre-item">
        <Livre :livre="livre" class="livre" />
        <delete-button :livre="livre" @delete="fetchIdUser"></delete-button>
        <router-link :to="{ name: 'updateLivre', params: { id: livre.livre_id } }"
          >Mettre à jour ce livre</router-link
        >
      </div>
    </div>
    <div class="commantaire" v-if="TabLivre == 2">
      <p v-if="!commentaires.length > 0">Pas de commentaires</p>
      <p v-for="commentaire in commentaires" :key="commentaire.id" class="commentaire">
        {{ commentaire.commentaire }}
      </p>
    </div>

    <div class="admin" v-if="TabLivre == 3">
      <div v-for="livre in LivresAdmin" :key="livre.id" class="livre-item">
        <Livre :livre="livre" class="livre" />
        <delete-button :livre="livre" @delete="fetchAllLivre"></delete-button>
      </div>
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
const LivresAdmin = ref(true)
const fetchIdUser = async () => {
  UtilisateurService.getUtilisateurId().then(async (res) => {
    idUser.value = res.data
    await fetchUser(idUser.value)
    await fetchCom(idUser.value)
    LivreService.getLivresUser(idUser.value).then((res) => {
      livres.value = res.data.data
    })
  })
}
const fetchAllLivre = async () => {
  LivreService.getAllLivres().then((res) => {
    LivresAdmin.value = res.data.data
  })
}
const fetchCom = async (id) => {
  CommentaireService.getCommentaires(id).then((res) => {
    commentaires.value = res.data.data
  })
}
const fetchUser = async (id) => {
  UtilisateurService.getUtilisateurById(id).then((res) => {
    User.value = res.data.data[0]
  })
}

onMounted(async () => {
  await fetchIdUser()
  await fetchAllLivre()
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
.commantaire,
.admin {
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

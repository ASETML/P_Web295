<script setup>
import CommentaireForm from '@/components/CommentaireForm.vue'
import LivreService from '@/services/LivreService'
import { onMounted, ref, computed, watch } from 'vue'

const props = defineProps(['id'])

const id = computed(() => props.id)

const livre = ref(null)
const fetchLivre = async () => {
  LivreService.getLivre(id.value)
    .then((response) => {
      livre.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  fetchLivre()
})

watch(() => {
  livre.value = null
  fetchLivre()
})
</script>

<template>
  <div id="container">
    <img :src="'http://localhost:3000/uploads/' + livre.image" />
    <div class="details">
      <h2>{{ livre.titre }} - {{ livre.ecrivain_prenom }} {{ livre.ecrivain_nom }}</h2>
      <p>{{ livre.editeur_nom }} {{ livre.annee_edition }}</p>
      <a :href="livre.extrait" target="blank">{{ livre.extrait }}</a>
      <p>Nombre de page: {{ livre.nb_pages }}</p>
      <p>
        Catégorie: <router-link :to="{ name: 'search' }">{{ livre.categorie_nom }}</router-link>
      </p>
      <!-- TODO: Quand on arrive sur la page de recherche, la catégorie du livre est déjà selectionnée -->
      <h3>Résumé</h3>
      <p class="resume">{{ livre.resume }}</p>

      <section v-if="livre.commentaires.length > 0">
        <h3>Commentaires</h3>
        <article v-for="commentaire in livre.commentaires" :key="commentaire.id">
          <p>{{ commentaire.commentaire }}</p>
        </article>
      </section>
      <commentaire-form :id="id" @commenter="fetchLivre()" />
    </div>
  </div>
</template>

<style scoped>
.lastBooks {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.book {
  display: grid;
  grid-template-columns: 33% 34% 33%;
  grid-template-rows: 2;
}

/*Pour faire un vide car on veut 5 livres*/
.filler {
  grid-column: 2;
  grid-row: 2;
}

.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home {
  background-color: #f8fff4;
}

#container {
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.resume {
  background-color: #d3d3d3;
  padding: 5px;
  border-radius: 5px;
}

img {
  width: 15%;
  border-radius: 5%;
  transition: all 0.5s;
}

.details {
  margin-left: 10%;
}

img:hover {
  rotate: 360deg;
  width: 25%;
}
</style>

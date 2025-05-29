<template>
  <div class="livrecomponent">
    <img :src="'http://localhost:3000/uploads/' + livre.image" alt="" />
    <div class="details">
      <router-link :to="{ name: 'book', params: { id: livre.livre_id } }" class="livrecomponent">
        <h2>{{ livre.titre }}</h2>
      </router-link>

      <h4>{{ livre.ecrivain_prenom + ' ' + livre.ecrivain_nom }}</h4>

      <router-link :to="{ name: 'userDetail', params: { id: livre.utilisateur_fk } }">
        <p>{{ user?.pseudo }}</p>
      </router-link>
      <p>{{ livre.description }}</p>
      <p>{{ livre.editeur_nom }} - {{ livre.annee_edition }}</p>
      <div class="rating" v-if="!isNaN(livre.moyenne_appreciation)">
        <p>{{ livre.moyenne_appreciation }}</p>
        <img src="../assets/star.webp" />
      </div>
    </div>
  </div>
</template>

<script setup>
import UtilisateurService from '@/services/UtilisateurService'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['livre'])
const user = ref(null)
console.log(props.livre.utilisateur_fk)
const fetchUser = async () => {
  UtilisateurService.getUtilisateurById(props.livre.utilisateur_fk).then((response) => {
    user.value = response.data.data[0]
    console.log(user.value)
  })
}
watch(() => {
  fetchUser()
})
onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
* {
  transition: all 0.5s;
  text-decoration: none;
  color: black;
}

img {
  width: 20%;
  border-radius: 5%;
}

.livrecomponent:hover img {
  /*rotate: 360deg;*/
  transform: rotate3d(1, 0, 1, 360deg);
  width: 50%;
}

.livrecomponent {
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.livrecomponent:hover {
  translate: 0px -5px;
  transform: scale(1.05, 1.05);
}

.livrecomponent:hover p {
  font-size: larger;
}

.livrecomponent:hover h2 {
  font-size: xx-large;
}

.livrecomponent:hover h4 {
  font-size: larger;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
}

.rating {
  display: flex;
  flex-direction: row;
}

.rating img {
  height: 250%;
}
</style>

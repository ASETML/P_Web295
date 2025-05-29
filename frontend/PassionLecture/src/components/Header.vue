<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }"><h2>Passion Lecture</h2></RouterLink>
      <div>
        <RouterLink :to="{ name: 'search' }"><p class="link">Recherche</p></RouterLink>

        <RouterLink :to="{ name: 'inscription' }" v-if="!isIdentified"
          ><p class="link">Inscription</p></RouterLink
        >
        <RouterLink :to="{ name: 'connexion' }" v-if="!isIdentified"
          ><p class="link"><img v-bind:src="iconeProfile" /></p
        ></RouterLink>
        <RouterLink :to="{ name: 'creationLivre' }" v-if="isIdentified"
          ><p class="link">Ajouter un livre</p></RouterLink
        >
        <RouterLink :to="{ name: 'addAuthor' }" v-if="isIdentified"
          ><p class="link">Ajouter un auteur / editeur</p></RouterLink
        >
        <RouterLink :to="{ name: 'compte' }" v-if="isIdentified"
          ><p class="link"><img v-bind:src="iconeProfile" /></p
        ></RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
import iconeProfile from '../assets/iconeProfile.webp'
var isIdentified = ref(null)
onMounted(() => {
  isIdentified.value = Cookies.get('authcookie')
})

const iconeProfileImage = iconeProfile
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap');

nav {
  background-color: #272727;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
}

nav div {
  display: flex;
  flex-direction: row;
  gap: 2rem; /* Ajoute de l'espace entre les liens */
}

.link {
  color: #ffffff;
  cursor: pointer;
}

h2 {
  font-family: 'Major Mono Display', monospace;
  color: #ffffff;
  margin: 0;
}

img {
  height: 20%;
  width: 15%;
  align-content: right;
}
a {
  text-decoration: none;
}
</style>

<template>
  <router-link :to="{ name: 'book', params: { id: livre.livre_id } }" class="livre">
    <img :src="'http://localhost:3000/uploads/' + livre.image" alt="" />
    <div class="details">
      <h2>{{ livre.titre }}</h2>
      <h4>{{ livre.ecrivain_prenom + ' ' + livre.ecrivain_nom }}</h4>
      <p>{{ livre.description }}</p>
      <p>{{ livre.editeur_nom }} - {{ livre.annee_edition }}</p>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps(['livre'])
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

.livre:hover img {
  rotate: 360deg;
  width: 50%;
}

.livre {
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

.livre:hover {
  translate: 0px -5px;
  transform: scale(1.05, 1.05);
}

.livre:hover p {
  font-size: larger;
}

.livre:hover h2 {
  font-size: xx-large;
}

.livre:hover h4 {
  font-size: larger;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
}
</style>

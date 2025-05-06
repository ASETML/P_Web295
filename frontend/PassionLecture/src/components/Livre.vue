<template>
  <router-link to="book" class="livre">
    <img :src="livre.image" alt="" />
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
console.log('A')
</script>

<style scoped>
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
}

.livre:hover {
  translate: 0px -5px;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
}
</style>

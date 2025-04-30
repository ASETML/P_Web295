<template>
  <div class="livre">
    <img :src="props.livre.image" alt="" />
    <h2>{{ props.livre.titre }}</h2>
    <p>{{ props.livre.description }}</p>
    <p>{{ props.livre.editeur }} - {{ props.livre.annee }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['livre'])
</script>

<style scoped>
.livre {
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.livre:hover {
  translate: 0px -5px;
}
</style>

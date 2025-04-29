<template>
  <div class="livre">
    <img :src="livre.image" alt="" />
    <h2>{{ livre.titre }}</h2>
    <p>{{ livre.description }}</p>
    <p>{{ livre.editeur }} - {{ livre.annee }}</p>
  </div>
</template>

<script setup>
defineProps({
  livre: {
    type: Object,
    required: true,
  },
})
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

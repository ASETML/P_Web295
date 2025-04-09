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

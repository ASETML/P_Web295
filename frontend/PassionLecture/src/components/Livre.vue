<template>
  <div class="livre">
    <img :src="livre.image" alt="" />
    <div class="text">
      <h2>{{ livre.titre }}</h2>
      <p>{{ livre.description }}</p>
      <p>{{ livre.editeur }} - {{ livre.annee }}</p>
    </div>
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
<style setup>
.livre {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #d3d3d3; /* gris clair */
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}
.text {
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.livre img {
  width: 150px;
  height: 220px;
  object-fit: cover;
  background-color: white;
  border: 1px solid #aaa;
  margin-bottom: 20px;
}

.livre h2 {
  margin: 0 0 10px;
  font-size: 24px;
}

.description {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0 10px;
}

.editeur {
  font-weight: bold;
  font-size: 14px;
}
</style>

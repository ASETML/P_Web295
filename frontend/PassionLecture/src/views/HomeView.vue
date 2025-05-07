<script setup>
import Livre from '@/components/Livre.vue'
import LivreService from '@/services/LivreService'
import { onMounted, ref, watch } from 'vue'

const livres = ref([null])

const fetchLivres = async () => {
  LivreService.getLastLivres(5)
    .then((res) => {
      livres.value = res.data.data
      console.log(livres.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

//TEMP
onMounted(() => {
  fetchLivres()
})

watch(() => {
  livres.value = null
  fetchLivres()
})
</script>

<template>
  <div class="home">
    <section class="welcome">
      <h1>Bienvenue sur Passion Lecture</h1>
      <h3>Un site pour partager nos lectures</h3>
    </section>
    <section class="lastBooks">
      <div class="book">
        <Livre v-for="livre in livres" :key="livre" :livre="livre" class="livre"></Livre>
        <p class="filler"></p>
      </div>
    </section>
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

.livre:nth-child(2) {
  transform: translateY(50%);
}
.livre:nth-child(2):hover {
  transform: translateY(50%) scale(1.05, 1.05);
}
</style>

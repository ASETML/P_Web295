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
        <Livre v-for="livre in livres" :key="livre" :livre="livre"></Livre>
        <p class="filler"></p>
        <!-- <article>
        <Livre :livre="livres.values[0]"></Livre>
        <Livre :livre="livres.values[1]"></Livre>
      </article>
      <article>
        <Livre :livre="livres.values[2]"></Livre>
      </article>
      <article>
        <Livre :livre="livres.values[3]"></Livre>
        <Livre :livre="livres.values[4]"></Livre>
      </article> -->
      </div>
    </section>
  </div>
</template>

<style scoped>
/* .book {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.book article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 33%;
} */

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
</style>

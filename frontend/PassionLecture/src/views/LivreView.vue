<script setup>
import Livre from '@/components/Livre.vue'
import LivreService from '@/services/LivreService'
import { onMounted, ref, computed } from 'vue'

const props = defineProps(['id'])

const id = computed(() => props.id)

const livre = ref(null)
onMounted(() => {
  LivreService.getLivre(id.value)
    .then((response) => {
      livre.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <Livre :livre="livre"></Livre>
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

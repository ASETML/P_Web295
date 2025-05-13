<script setup>
import Livre from '@/components/Livre.vue'
import { computed, onMounted, ref, watch } from 'vue'
import CategoryService from '@/services/CategoryService.js'
import LivreService from '@/services/LivreService'

const selection = ref('')
const categories = ref(null)
const livres = ref([null])

const livresFiltered = computed(() => {
  if (livres.value && selection.value != '') {
    return livres.value.filter((livre) => {
      return livre.categorie_fk == selection.value
    })
  }
  return livres.value
})

const cat_nom = computed(() => {
  return categories.value.filter((cat) => {
    if (cat.categorie_id == selection.value) {
      console.log(cat.nom)
      return cat.nom
    }
  })
})

const getcategory = async () => {
  CategoryService.getCategory()
    .then((res) => {
      categories.value = res.data.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const fetchLivres = async () => {
  //LivreService.getAllLivres() //Limite de 5 dans le backend
  LivreService.getLastLivres(-1)
    .then((res) => {
      livres.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}

watch(() => {
  livres.value = null
  fetchLivres()
})

onMounted(async () => {
  await getcategory()
  await fetchLivres()
})
</script>

<template>
  <div class="recherche">
    <h1 v-if="selection === ''">Il y a {{ livresFiltered.length }} livres au total</h1>
    <h1 v-else>Il y a {{ livresFiltered.length }} livres dans la catégorie {{ cat_nom[0].nom }}</h1>

    <select name="Category" v-model="selection" @change="fetchLivres">
      <option value="">Toute catégorie</option>
      <option
        v-for="category in categories"
        :key="category.categorie_id"
        :value="category.categorie_id"
      >
        {{ category.nom }}
      </option>
    </select>
    <Livre v-for="livre in livresFiltered" :key="livre.id" :livre="livre" class="livre" />
    <p v-if="livresFiltered.length <= 0">Il n'y a pas de livres qui ont cette catégorie</p>
  </div>
</template>

<style scoped>
.livre {
  width: 30%;
}

.livre:hover {
  margin-top: 20px;
}

.recherche {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script setup>
import Livre from '@/components/Livre.vue'
import { computed, onMounted, ref, watch } from 'vue'
import CategoryService from '@/services/CategoryService.js'
import LivreService from '@/services/LivreService'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'



const selection = ref('')
const categories = ref(null)
const livres = ref([])
const router = useRouter()
const route = useRoute()

const livresFiltered = computed(() => {
  if (!livres.value) return []
  const nonNullLivres = livres.value.filter((livre) => livre !== null)
  if (selection.value !== '') {
    return nonNullLivres.filter((livre) => livre.categorie_fk == selection.value)
  }
  return nonNullLivres
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

/*petit bug où quand on recherche une categorie via la liste déroulante 
alors l'url ne change pas mais quand on change l'url pour faire une recherche
alors la liste déroulante se met a jour  !
*/
const goToCategorie = async (categ) => {
  router.push({ name: 'search', params: {cat: categ}})

}


const fetchLivres = async () => {
  //LivreService.getAllLivres() //Limite de 5 dans le backend
  LivreService.getLastLivres(-1)
    .then((res) => {
      livres.value = res.data.data
      console.log(livres.value)
    })
    .catch((err) => {
      console.log(err)
    })
}

watch(

  [() => route.params.cat, categories],
  ([catParam, cats]) => {
    if (!catParam || !cats) return
    const found = cats.find((cat) => cat.nom.toLowerCase() === catParam.toLowerCase())
    if (found) {
      selection.value = found.categorie_id
    } else {
      selection.value = ''
    }
  },
  { immediate: true }
)


onMounted(async () => {
  await getcategory()
  await fetchLivres()
})

</script>

<template>
  <div class="recherche">
    <!-- Ortographe du pluriel, condition avec le nb de livres trouvés -->
    <h1 v-if="selection === ''">Il y a {{ livresFiltered.length }} livres au total</h1>
    <h1 v-else-if="livresFiltered.length === 0">
      Il n'y a pas de livre dans la catégorie {{ cat_nom[0].nom }}
    </h1>
    <h1 v-else-if="livresFiltered.length === 1">
      Il y a 1 livre dans la catégorie {{ cat_nom[0].nom }}
    </h1>
    <h1 v-else>Il y a {{ livresFiltered.length }} livres dans la catégorie {{ cat_nom[0].nom }}</h1>

    <select name="Category" v-model="selection" @change="goToCategorie(cat_nom)">
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

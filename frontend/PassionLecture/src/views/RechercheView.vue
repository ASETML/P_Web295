<template>
  <div class="recherche">
    <select name="Category" v-model="selection" @change="Chercher">
      <option value="">Category</option>
      <option v-for="category in categories" :key="category.id" :value="category.nom">
        {{ category.nom }}
      </option>
    </select>
    <LivreComponent v-for="livre in livres" :key="livre.id" :livre="livre" />
  </div>
</template>
<script setup>
import LivreComponent from '@/components/LivreComponent.vue'
import { onMounted, ref } from 'vue'
import CategoryService from '@/services/CategoryService.js'
const selection = ref('')
const categories = ref(null)
function Chercher() {
  alert(selection.value)
}
const getcategoryy = () => {
  CategoryService.getCategory()
    .then((res) => {
      categories.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const livres = [
  {
    id: 124,
    titre: 'Scrum',
    description: 'Un livre qui apprend Scrum pour les tout petits',
    editeur: 'Edition du Panthéon',
    annee: 2008,
    image:
      'https://images-na.ssl-images-amazon.com/images/I/51+3p6hXWnL._SX329_BO1,204,203,200_.jpg',
  },
  {
    id: 125,
    titre: 'Agilité en pratique',
    description: 'Un guide complet pour maîtriser l’agilité en entreprise',
    editeur: 'TechBooks',
    annee: 2015,
    image: 'https://m.media-amazon.com/images/I/41D5A2N2FHL.jpg',
  },
  {
    id: 126,
    titre: 'Le monde de JavaScript',
    description: 'Introduction ludique au JavaScript pour les jeunes développeurs',
    editeur: 'Code Junior',
    annee: 2021,
    image: 'https://eloquentjavascript.net/img/cover.jpg',
  },
  {
    id: 127,
    titre: 'La magie du CSS',
    description: 'Un voyage coloré à travers les feuilles de style',
    editeur: 'Design & Code',
    annee: 2019,
    image: 'https://www.sitepoint.com/wp-content/uploads/2020/07/Book-CSS-Mastery-3rd-Edition.jpg',
  },
  {
    id: 128,
    titre: 'Docker pour les enfants',
    description: 'Comprendre la conteneurisation en jouant',
    editeur: 'Cloud Kids',
    annee: 2023,
    image: 'https://m.media-amazon.com/images/I/41y6z3+1+6L.jpg',
  },
]
onMounted(() => {
  getcategoryy()
})
</script>

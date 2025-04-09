<template>
  <div class="recherche">
    <h1>coucou</h1>
    <Livre v-for="livre in livres" :key="livre.id" :livre="livre" />
  </div>
</template>
<script setup>
import Livre from '@/components/Livre.vue'

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
</script>

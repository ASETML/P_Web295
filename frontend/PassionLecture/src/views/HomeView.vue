<script setup>
import Livre from '@/components/Livre.vue'
import { ref } from 'vue'

const livres = ref([
  {
    titre: 'aSAFDASDSADADAS',
    description: 'asdfgapuidvipuadfviuagdfiguv  78e4tghdfuigh78wega',
    editeur: 'asdfgsdr',
    annee: 1234,
  },
  {
    titre: 'adadasda',
    description: 'sadad sdf ca',
    editeur: 'ds',
    annee: 3456,
  },
  {
    titre: 'dfgdfe555',
    description: 'sdg684sdfgxvb  gth rr',
    editeur: 'asdfgsdr',
    annee: 3564,
  },
  {
    titre: 'uzsdgrzuefg78s7d7dsdsds',
    description: 'asdfgapui dvsdfi puadfviuagdfiguregv  78e4tgh dfuigh78wega',
    editeur: 'dfgergg',
    annee: 1235,
  },
  {
    titre: '349fzdfègb8fdbf',
    description: 'asdf gapuidfgdvipuadfvi uagdfiguv  78e4tghdfuigh78wega',
    editeur: 'asdfgsdr',
    annee: 3255,
  },
])
</script>

<template>
  <div class="home">
    <section class="welcome">
      <h1>Bienvenue sur Passion Lecture</h1>
      <h3>Un site pour partager nos lectures</h3>
    </section>
    <section class="book">
      <article>
        <Livre :livre="livres[0]"></Livre>
        <Livre :livre="livres[1]"></Livre>
      </article>
      <article>
        <Livre :livre="livres[2]"></Livre>
      </article>
      <article>
        <Livre :livre="livres[3]"></Livre>
        <Livre :livre="livres[4]"></Livre>
      </article>
    </section>
  </div>
</template>

<style scoped>
.book {
  display: flex;
  flex-direction: row;
}

.book article {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

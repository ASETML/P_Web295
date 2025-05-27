<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
}

#app {
  transition: all 90000s;
}

#app:hover {
  transform: rotate3d(1, 0, 1, 360deg);
}
</style>

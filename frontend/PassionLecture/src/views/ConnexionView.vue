<template>
  <div class="connexion">
    <h1>Connectez-vous !</h1>
    <form @submit.prevent="connexion">
      <input type="text" id="pseudo" v-model="pseudo" placeholder="Pseudo" /> <br />
      <input type="password" id="password" v-model="password" placeholder="Mot De Passe" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
<script setup>
import ConnexionService from '@/services/ConnexionService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const pseudo = ref('')
const password = ref('')
const router = useRouter()
const connexion = () => {
  ConnexionService.PostConnexion(pseudo.value, password.value)
    .then((res) => {
      console.log(res.headers)
      console.log(res.data)
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
      router.push('/connexion')
    })
}
</script>

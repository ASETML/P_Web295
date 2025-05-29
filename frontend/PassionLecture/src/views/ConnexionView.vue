<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2 class="login-title">Connexion</h2>
      <form class="login-form" @submit.prevent="connexion">
        <div class="input-group">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="pseudo" v-model="pseudo" placeholder="Pseudo" required /> <br />
        </div>
        <div class="input-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" placeholder="Mot De Passe" />
        </div>
        <input type="submit" class="login-btn" value="Submit" />
        <p v-if="error" class="error">Mauvais pseudo ou mot de passe</p>
      </form>
    </div>
  </div>
</template>
<script setup>
import ConnexionService from '@/services/ConnexionService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const pseudo = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const connexion = () => {
  ConnexionService.PostConnexion(pseudo.value, password.value)
    .then((res) => {
      error.value = false
      router.push('/')
    })
    .catch((err) => {
      error.value = true
    })
}
</script>
<style scoped>
/* Couleurs personnalisées */
:root {
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --accent: #f59e0b;
  --bg: #bcd2ff;
  --white: #ffffff;
  --gray-dark: #1f2937;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Corps */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, var(--primary), var(--accent));
  min-height: 100vh;
  display: grid;
  place-items: center;
}

/* Conteneur centré */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh; /* Assure la hauteur totale de l'écran */
  background-color: #bcd2ff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
  margin: auto; /* Centrage horizontal au cas où */
}

/* Titre */
.login-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--gray-dark);
  font-size: 2rem;
}

/* Formulaire */
.login-form {
  display: flex;
  flex-direction: column;
}

/* Groupe de champ */
.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--gray-dark);
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: var(--primary);
  outline: none;
}

/* Bouton */
.login-btn {
  padding: 0.75rem;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: var(--primary-dark);
}

/* Lien */
.login-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.login-link a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.error {
  color: red;
}
</style>

<template>
  <h1>je crée des livres !</h1>
  <form class="login-form" @submit.prevent="creationLivre">
    <div class="form-grid">
      <div class="input-group">
        <label for="Titre">Titre</label>
        <input type="text" id="titre" v-model="titre" placeholder="Titre" required />
      </div>
      <div class="input-group">
        <label for="Extrait">Extrait</label>
        <input type="text" id="Extrait" v-model="extrait" placeholder="Extrait" required />
      </div>
      <div class="input-group">
        <label for="NombrePage">Nombre de pages</label>
        <input
          type="text"
          id="NombrePage"
          v-model="nombrePage"
          placeholder="Nombre de pages"
          required
        />
      </div>
      <div class="input-group">
        <label for="AnneeEdition">Année édition</label>
        <input
          type="text"
          id="AnneeEdition"
          v-model="anneeEdition"
          placeholder="Année édition"
          required
        />
      </div>
      <div class="input-group">
        <label for="Résumé">Résumé</label>
        <textarea id="Résumé" v-model="resume" placeholder="Résumé" required></textarea>
      </div>
      <div class="input-group image-upload" style="grid-column: span 2">
        <label for="image">Image (ex: couverture)</label>
        <input type="file" id="image" @change="handleImage" accept="image/*" />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Aperçu de l'image" />
        </div>
      </div>
    </div>
    <input type="submit" class="login-btn" value="Créer le compte" />
  </form>
</template>
<script setup>
import router from '@/router'
import PostLivreService from '@/services/PostLivreService'
import { ref } from 'vue'
const titre = ref('')
const extrait = ref('')
const nombrePage = ref('')

const anneeEdition = ref('')
const resume = ref('')
const imageFile = ref(null)
const imagePreview = ref(null)
const handleImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}
const creationLivre = () => {
  if (imageFile.value) {
    PostLivreService.postLivre(
      titre.value,
      parseInt(nombrePage.value),
      extrait.value,
      resume.value,
      parseInt(anneeEdition.value),
      imageFile.value,
    )
      .then((response) => {
        console.log('Livre créé avec succès', response.data)
        router.push('search')
      })
      .catch((error) => {
        console.error('Erreur lors de la création du livre', error)
      })
  } else {
    console.error('Aucune image sélectionnée')
  }
}
</script>
<style>
.image-upload input[type='file'] {
  margin-top: 8px;
}

.image-preview {
  margin-top: 12px;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 10px;
  border: 1px solid #ccc;
  object-fit: cover;
}

.login-form {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 40px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.input-group input,
.input-group textarea {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  width: 100%;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  outline: none;
}

.input-group textarea {
  min-height: 100px;
  resize: vertical;
  grid-column: span 2;
}

.login-btn {
  margin-top: 30px;
  width: 100%;
  padding: 12px;
  background-color: #4f46e5;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #4338ca;
}

/* Responsive */
@media (max-width: 700px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .input-group textarea {
    grid-column: span 1;
  }
}
</style>

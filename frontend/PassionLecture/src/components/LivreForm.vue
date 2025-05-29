<template>
  <form class="login-form" @submit.prevent="sendForm">
    <div class="form-grid">
      <div class="input-group">
        <label for="Titre">Titre</label>
        <input type="text" id="titre" v-model="titre" placeholder="Titre" required />
      </div>
      <div class="input-group">
        <label for="Extrait">Extrait</label>
        <input type="text" id="Extrait" v-model="extrait" placeholder="Extrait" required />
        <p v-if="mustbeurl" class="error">Doit être une URL</p>
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
        <label for="Categorie">Categorie</label>
        <select name="Category" v-model="selectionCat" required>
          <option value="">Selectionner une Categorie</option>
          <option
            v-for="category in categories"
            :key="category.categorie_id"
            :value="category.categorie_id"
          >
            {{ category.nom }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <label for="Editeur">Editeur</label>
        <select name="Editeur" v-model="selectionEdi" required>
          <option value="">Selectionner un Editeur</option>
          <option v-for="editeur in editeurs" :key="editeur.editeur_id" :value="editeur.editeur_id">
            {{ editeur.nom }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <label for="Ecrivain">Ecrivain</label>
        <select name="Ecrivain" v-model="selectionEcr" required>
          <option value="">Selectionner un Ecrivain</option>
          <option
            v-for="ecrivain in ecrivains"
            :key="ecrivain.ecrivain_id"
            :value="ecrivain.ecrivain_id"
          >
            {{ ecrivain.prenom }} {{ ecrivain.nom }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <label for="Résumé">Résumé</label>
        <textarea id="Résumé" v-model="resume" placeholder="Résumé" required></textarea>
      </div>
      <div v-if="image" class="input-group image-upload" style="grid-column: span 2">
        <label for="image">Image (ex: couverture)</label>
        <input type="file" id="image" @change="handleImage" accept="image/*" />
        <div v-if="image" class="image-preview">
          <img :src="imagePreview" alt="Aperçu de l'image" />
        </div>
      </div>
    </div>
    <input v-if="action === 'modifier'" type="submit" class="login-btn" value="Modifier le Livre" />
    <input v-if="action === 'creer'" type="submit" class="login-btn" value="Créer le Livre" />
    <p v-if="error" class="error">Une erreur est survenu</p>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryService from '@/services/CategoryService'
import EditeurService from '@/services/EditeurService'
import EcrivainService from '@/services/EcrivainService'

const emit = defineEmits(['send-form']) //Evènements

const props = defineProps({
  livre: {
    type: Object,
    required: true,
  },
  image: {
    type: Boolean,
  },
  action: {
    type: String,
  },
})

const selectionCat = props.livre.categorie_fk ? ref(props.livre.categorie_fk) : ref('')
const selectionEdi = props.livre.editeur_fk ? ref(props.livre.editeur_fk) : ref('')
const selectionEcr = props.livre.ecrivain_fk ? ref(props.livre.ecrivain_fk) : ref('')
const titre = props.livre.titre ? ref(props.livre.titre) : ref('')
const extrait = props.livre.extrait ? ref(props.livre.extrait) : ref('')
const nombrePage = props.livre.nb_pages ? ref(props.livre.nb_pages) : ref('')
const anneeEdition = props.livre.annee_edition ? ref(props.livre.annee_edition) : ref('')
const resume = props.livre.resume ? ref(props.livre.resume) : ref('')
const imageFile = ref(null)
const imagePreview = ref(null)
const categories = ref(null)
const editeurs = ref(null)
const ecrivains = ref(null)
const livre_id = ref(props.livre.livre_id)
const mustbeurl = ref(false)
const error = ref(false)

const handleImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

function isUrl(str) {
  if (
    str.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    )
  ) {
    mustbeurl.value = false
    return true
  }
  mustbeurl.value = true
  return false
}

const sendForm = () => {
  if (
    titre.value.length >= 2 &&
    isUrl(extrait.value) &&
    resume.value.length >= 2 &&
    selectionCat &&
    selectionEdi &&
    selectionEcr &&
    Number.isInteger(nombrePage) &&
    Number.isInteger(anneeEdition)
  ) {
    error.value = false
    const data = {
      livre_id,
      selectionCat,
      selectionEdi,
      selectionEcr,
      titre,
      extrait,
      nombrePage,
      anneeEdition,
      resume,
      imageFile,
      imagePreview,
    }

    emit('send-form', data)
  } else {
    error.value = true
  }
}

const getcategory = async () => {
  CategoryService.getCategory().then((res) => {
    categories.value = res.data.data
  })
}
const getEditeur = async () => {
  EditeurService.getEditeur().then((res) => {
    editeurs.value = res.data.data
  })
}
const getEcrivain = async () => {
  EcrivainService.getEcrivain().then((res) => {
    ecrivains.value = res.data.data
  })
}
onMounted(async () => {
  await getcategory()
  await getEditeur()
  await getEcrivain()
})
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

.error {
  color: red;
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

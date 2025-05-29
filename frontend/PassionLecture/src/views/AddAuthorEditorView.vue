<template>
    <div class="container">
        <section>
            <h2>Ajouter un editeur</h2>
            <form @submit.prevent="addEditor">
                <label for="editeur">Editeur</label>
                <input id="editeur" type="text" v-model="editeur" required></input>
                <input type="submit">
                <p class="error" v-if="editeurAlreadyExist">Un éditeur avec ce nom existe déjà</p>
            </form>
        </section>
        <section>
            <h2>Ajouter un auteur</h2>
            <form @submit.prevent="addAuthor">
                <label for="auteurNom">Nom de l'auteur</label>
                <input id="auteurNom" type="text" v-model="auteurNom" required></input>
                <label for="auteurPrenom">Prénom de l'auteur</label>
                <input id="auteurPrenom" type="text" v-model="auteurPrenom" required></input>
                <input type="submit">
            </form>
        </section>
    </div>
</template>

<script setup>
import {ref} from "vue"
import EditeurService from '@/services/EditeurService'
import EcrivainService from '@/services/EcrivainService'

const editeur = ref("");

const auteurNom = ref("");
const auteurPrenom = ref("");

const editeurAlreadyExist = ref("")

const addEditor = async () => {
    if (editeur.value.length >= 2){
    EditeurService.postEditeur(editeur.value).then((res) => {
        editeurAlreadyExist.value = false
    }).catch((error) => {
        if (error.response.status === 400) {
            editeurAlreadyExist.value = true
        } 
    })
}
}

const addAuthor = async () => {
    if (auteurNom.value && auteurPrenom.value){
    EcrivainService.postEcrivain(auteurNom.value, auteurPrenom.value).then((res) => {
        console.log(res.data)
    })
}
}
</script>

<style scoped>
section form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.error {
    color: red;
}
</style>
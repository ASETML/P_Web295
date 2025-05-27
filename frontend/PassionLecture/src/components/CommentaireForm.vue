<script setup>
import CommentaireService from '@/services/CommentaireService'
import { ref, computed } from 'vue'

const emit = defineEmits(['commenter']) //Evènements
const props = defineProps(['id'])

const id = computed(() => props.id)

const commentaire = ref(null)
const error = ref(null)

const comment = async () => {
  await CommentaireService.postCommentaires(id.value, commentaire.value)
    .then((res) => {
      commentaire.value = null
      emit('commenter')
    })
    .catch((err) => {
      if (err.response.status === 400) {
        error.value = true
      }
    })
}
</script>

<template>
  <section>
    <h3>Commenter ce livre</h3>
    <form @submit.prevent="comment">
      <label for="commentaire">Votre commentaire</label>
      <textarea id="commentaire" v-model="commentaire"></textarea>
      <input type="submit" />
    </form>
    <label class="error" v-if="error">Le commentaire est obligatoire</label>
  </section>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}
label {
  margin-top: 2%;
}
.error {
  color: red;
}
input {
  margin: 0.5em;
  padding: 0.5em;
}
</style>

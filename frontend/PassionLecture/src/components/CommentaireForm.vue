<script setup>
import CommentaireService from '@/services/CommentaireService'
import { ref, computed } from 'vue'

const emit = defineEmits(['commenter']) //Evènements
const props = defineProps(['id'])

const id = computed(() => props.id)

const commentaire = ref(null)
const comment = async () => {
  await CommentaireService.postCommentaires(id.value, commentaire.value, 1)
  commentaire.value = null
  sleep(10)
  emit('commenter')
}
</script>

<template>
  <form @submit.prevent="comment">
    <label for="commentaire">Commenter ce livre</label>
    <textarea id="commentaire" v-model="commentaire"></textarea>
    <input type="submit" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
label {
  margin-top: 2%;
  font-size: larger;
}
</style>

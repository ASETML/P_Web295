<script setup>
import { computed } from 'vue'
import LivreService from '@/services/LivreService'

const props = defineProps(['livre'])

const emit = defineEmits(['delete']) //Evènements

const livre = computed(() => props.livre)

const DeleteBook = () => {
  const confirmation = confirm(
    'Etes vous sûr que vous voulez supprimmer le livre: ' + livre.value.titre,
  )
  if (confirmation) {
    LivreService.delLivre(livre.value.livre_id).then((res) => {
      emit('delete')
    })
  }
}
</script>
<template>
  <button @click="DeleteBook">Supprimmer</button>
</template>
<style scoped></style>

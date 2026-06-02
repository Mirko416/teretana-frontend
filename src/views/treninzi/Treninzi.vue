<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const treninzi = ref<any[]>([])
const loading = ref(false)

async function dohvati() {
  loading.value = true
  const res = await api.get('/treninzi')
  console.log("Treninzi:", res.data)
  treninzi.value = res.data.items
  loading.value = false
}

function dodaj() {
  router.push('/treninzi/dodaj')
}

function obrisi(id: number) {
  api.delete(`/treninzi/${id}`).then(dohvati)
}

onMounted(dohvati)
</script>

<template>
  <v-card>
    <v-card-title>
      Treninzi

      <v-spacer />

      <v-btn color="primary" @click="dodaj">
        Dodaj
      </v-btn>
    </v-card-title>

    <v-data-table
      :items="treninzi"
      :loading="loading"
      :headers="[
          { title: 'Datum', value: 'datum' },
          { title: 'Opis', value: 'opis'},
          { title: 'Član', value: 'clan'},
          { title: 'Trener', value: 'trener' },
      ]"
    >
      <template #item.actions="{ item }">
        <v-btn icon="mdi-delete" @click="obrisi(item.id)" />
      </template>
    </v-data-table>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const trener = reactive<any>({
  id: '',
  ime: '',
  prezime: '',
  specijalizacija: '',
  email: '',
})

async function dohvatiTrenera() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/treneri/${route.params.id}`)
    const data = await response.json()
    Object.assign(trener, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function povratak() {
  router.push('/treneri')
}

function urediTrenera() {
  router.push(`/treneri/${route.params.id}/uredi`)
}

onMounted(async () => {
  await dohvatiTrenera()
})

</script>

<template>
  <v-card max-width="700">
    <v-card-title class="d-flex align-center">
      Pregled trenera

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-pencil"
        @click="urediTrenera"
      >
        Uredi
      </v-btn>
    </v-card-title>

    <v-card-text v-if="loading">
      <p><strong>ID:</strong> {{ trener.id }}</p>
      <p><strong>Ime:</strong> {{ trener.ime }}</p>
      <p><strong>Prezime:</strong> {{ trener.prezime }}</p>
      <p><strong>Email:</strong> {{ trener.email }}</p>
      <p><strong>Specijalizacija:</strong> {{ trener.specijalizacija }}</p>
    </v-card-text>

    <v-card-text v-else>
      Učitavanje...
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        variant="text"
        @click="povratak"
      >
        Natrag
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
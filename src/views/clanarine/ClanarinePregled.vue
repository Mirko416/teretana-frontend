<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const clanarina = reactive<any>({
  id: '',
  naziv: '',
  cijena: '',
  duzina_trajanja: '',
})

async function dohvatiClanarinu() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanarine/${route.params.id}`)
    const data = await response.json()
    Object.assign(clanarina, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function povratak() {
  router.push('/clanarine')
}

function urediClanarinu() {
  router.push(`/clanarine/${route.params.id}/uredi`)
}

onMounted(async () => {
  await dohvatiClanarinu()
})

</script>

<template>
  <v-card max-width="700">
    <v-card-title class="d-flex align-center">
      Pregled članarine

      <v-spacer />

      <v-btn
          color="primary"
          prepend-icon="mdi-pencil"
          @click="urediClanarinu"
      >
        Uredi
      </v-btn>
    </v-card-title>

    <v-card-text v-if="!loading && clanarina">
      <p><strong>ID:</strong> {{ clanarina.id }}</p>
      <p><strong>Naziv:</strong> {{ clanarina.naziv }}</p>
      <p><strong>Cijena:</strong> {{ clanarina.cijena }}</p>
      <p><strong>Dužina trajanja:</strong> {{ clanarina.duzina_trajanja }}</p>
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
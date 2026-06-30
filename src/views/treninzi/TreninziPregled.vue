<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const trening = reactive<any>({
  id: '',
  clan_id: '',
  trener_id: '',
  datum: '',
  opis: '',
})

async function dohvatiTrening() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/treninzi/${route.params.id}`)
    const data = await response.json()
    Object.assign(trening, data)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }

}

function povratak() {
  router.push('/treninzi')
}

function urediTrening() {
  router.push(`/treninzi/${route.params.id}/uredi`)
}

onMounted(async () => {
  await dohvatiTrening()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title class="d-flex align-center">
      Pregled treninga

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-pencil"
        @click="urediTrening()"
      >
        Uredi
      </v-btn>
    </v-card-title>

    <v-card-text v-if="!loading && trening">
      <p><strong>ID:</strong> {{ trening.id }}</p>
      <p><strong>Član:</strong> {{ trening.clan}}</p>
      <p><strong>Trener:</strong> {{ trening.trener}}</p>
      <p><strong>Opis:</strong> {{ trening.opis}}</p>
      <p><strong>Datum:</strong> {{ trening.datum}}</p>
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
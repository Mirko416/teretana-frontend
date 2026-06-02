<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const clanarina = reactive<any>({
  naziv: '',
  cijena: '',
  duzina_trajanja: '',
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi članarinu' : 'Dodaj članarinu')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : 'Spremi članarinu')

async function dohvatiClanarinu() {
  if (!route.params.id) {
    return
  }

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

async function spremiClanarinu() {
  loading.value = true

  const url = jeUredivanje.value
  ? `${API_URL}/clanarine/${route.params.id}`
  : `${API_URL}/clanarine`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch (url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clanarina),
    })

    router.push('/clanarine')
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function odustani() {
  router.push('/clanarine')
}

onMounted(async () => {
  await dohvatiClanarinu()
})
</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ naslov }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="clanarina.naziv"
        label="Naziv"
        prepend-inner-icon="mdi-account-outline"
      />

      <v-text-field
        v-model="clanarina.cijena"
        label="Cijena"
        prepend-inner-icon="mdi-currency-eur"
      />

      <v-text-field
        v-model="clanarina.duljina_trajanja"
        label="Duljina trajanja"
        prepend-inner-icon="mdi-calendar-clock"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        variant="text"
        @click="odustani"
      >
        Odustani
      </v-btn>

      <v-btn
        color="primary"
        :loading="loading"
        @click="spremiClanarinu"
      >
        {{ tekstGumba }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
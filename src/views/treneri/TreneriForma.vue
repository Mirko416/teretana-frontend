<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const trener = reactive<any>({
  ime: '',
  prezime: '',
  specijalizacija: '',
  email: '',
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi trenera' : 'Dodaj trenera')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi promjene' : "Spremi trenera")

async function dohvatiTrenera() {
  if (!route.params.id) {
    return
  }

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

async function spremiTrenera() {
  loading.value = true

  const url = jeUredivanje.value
    ? `${API_URL}/treneri/${route.params.id}`
    : `${API_URL}/treneri`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trener),
    })

    router.push('/treneri')
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function odustani() {
  router.push('/treneri')
}

onMounted(async () => {
  await dohvatiTrenera()
})

</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ naslov }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="trener.ime"
        label="Ime"
        prepend-inner-icon="mdi-account"
      />

      <v-text-field
        v-model="trener.prezime"
        label="Prezime"
        prepend-inner-icon="mdi-account-outline"
      />

      <v-text-field
        v-model="trener.email"
        label="E-pošta"
        prepend-inner-icon="mdi-email-outline"
        />

      <v-text-field
          v-model="trener.specijalizacija"
          label="Specijalizacija"
          prepend-inner-icon="mdi-dumbbell"
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
        @click="spremiTrenera"
      >
        {{ tekstGumba }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
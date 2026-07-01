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
  <v-container fluid class="page-gray">
    <div class="page-box">
      <h1 class="text-h4 font-weight-bold">
        {{ naslov }}
      </h1>

      <p class="page-text">
        Ovdje možeš dodati novu članarinu ili urediti podatke postojeće članarine.
      </p>

      <v-divider class="my-6" />

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="clanarina.naziv"
              label="Naziv"
              prepend-inner-icon="mdi-card-account-details"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="clanarina.cijena"
              label="Cijena"
              prepend-inner-icon="mdi-currency-eur"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
              v-model="clanarina.duzina_trajanja"
              label="Dužina trajanja"
              prepend-inner-icon="mdi-calendar-clock"
              variant="outlined"
          />
        </v-col>
      </v-row>

      <div class="page-actions">
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
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.page-gray {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding: 48px 24px;
}

.page-box {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.page-text {
  font-size: 18px;
  color: #333333;
  margin-top: 8px;
  margin-bottom: 0;
}

.page-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

:deep(.v-field) {
  background: white;
  color: black;
}

:deep(.v-label),
:deep(input) {
  color: black;
}
</style>
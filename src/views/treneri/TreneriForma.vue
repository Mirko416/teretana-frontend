<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

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
  <v-container fluid class="page-gray">
    <div class="page-box">
      <h1 class="text-h4 font-weight-bold">
        {{ naslov }}
      </h1>

      <p class="page-text">
        Ovdje možeš dodati novog trenera ili urediti podatke postojećeg trenera.
      </p>

      <v-divider class="my-6" />

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="trener.ime"
              label="Ime"
              prepend-inner-icon="mdi-account"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="trener.prezime"
              label="Prezime"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="trener.email"
              label="E-pošta"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="trener.specijalizacija"
              label="Specijalizacija"
              prepend-inner-icon="mdi-dumbbell"
              variant="outlined"
          />
        </v-col>
      </v-row>

      <div class="page-actions">
        <v-btn variant="text" @click="odustani">
          Odustani
        </v-btn>

        <v-btn
            color="primary"
            :loading="loading"
            @click="spremiTrenera"
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
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
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

.page-table {
  background: white;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  background: #f7f7f7;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 16px;
}

.info-item span {
  display: block;
  color: #666666;
  margin-bottom: 6px;
}

.info-item strong {
  color: black;
}

:deep(.v-data-table),
:deep(.v-field) {
  background: white;
  color: black;
}

:deep(.v-data-table-header__content),
:deep(.v-data-table__td),
:deep(.v-label),
:deep(input) {
  color: black;
}
</style>
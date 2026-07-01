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
  <v-container fluid class="page-gray">
    <div class="page-box">
      <div class="page-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Pregled članarine
          </h1>

          <p class="page-text">
            Ovdje su prikazani osnovni podaci odabrane članarine.
          </p>
        </div>

        <v-btn
            color="primary"
            prepend-icon="mdi-pencil"
            @click="urediClanarinu()"
        >
          Uredi
        </v-btn>
      </div>

      <v-divider class="mb-6" />

      <div v-if="loading">
        Učitavanje...
      </div>

      <div v-else class="info-grid">
        <div class="info-item">
          <span>ID</span>
          <strong>{{ clanarina.id }}</strong>
        </div>

        <div class="info-item">
          <span>Naziv</span>
          <strong>{{ clanarina.naziv }}</strong>
        </div>

        <div class="info-item">
          <span>Cijena</span>
          <strong>{{ clanarina.cijena }}</strong>
        </div>

        <div class="info-item">
          <span>Dužina trajanja</span>
          <strong>{{ clanarina.duzina_trajanja }}</strong>
        </div>
      </div>

      <div class="page-actions">
        <v-btn
            variant="text"
            @click="povratak"
        >
          Natrag
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

.page-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}
</style>
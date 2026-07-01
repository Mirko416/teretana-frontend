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
  <v-container fluid class="page-gray">
    <div class="page-box">
      <div class="page-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Pregled treninga
          </h1>

          <p class="page-text">
            Ovdje su prikazani osnovni podaci odabranog treninga.
          </p>
        </div>

        <v-btn
            color="primary"
            prepend-icon="mdi-pencil"
            @click="urediTrening()"
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
          <strong>{{ trening.id }}</strong>
        </div>

        <div class="info-item">
          <span>Član</span>
          <strong>{{ trening.clan }}</strong>
        </div>

        <div class="info-item">
          <span>Trener</span>
          <strong>{{ trening.trener }}</strong>
        </div>

        <div class="info-item">
          <span>Opis</span>
          <strong>{{ trening.opis }}</strong>
        </div>

        <div class="info-item">
          <span>Datum</span>
          <strong>{{ trening.datum }}</strong>
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
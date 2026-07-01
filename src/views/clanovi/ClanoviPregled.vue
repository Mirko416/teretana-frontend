<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter} from 'vue-router'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const tab = ref('info')
const pretplate = ref<any[]>([])
const clan = reactive<any>({
  id: '',
  ime: '',
  prezime: '',
  email: '',
  mobitel: '',
  datum_uclanjenja: '',
})

async function dohvatiClana() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanovi/${route.params.id}`)
    const data = await response.json()
    Object.assign(clan, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

async function dohvatiPretplate() {
  try {
    const response = await fetch(`${API_URL}/clanovi/${route.params.id}/pretplate`)
    pretplate.value = await response.json()
  } catch (error) {
    console.log(error)
  }
}

function povratak() {
  router.push('/clanovi')
}

function urediClana() {
  router.push(`/clanovi/${route.params.id}/uredi`)
}

onMounted(async () => {
  await dohvatiClana()
  await dohvatiPretplate()
})
</script>

<template>
  <v-container fluid class="clan-page">
    <div class="clan-box">
      <div class="clan-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Pregled člana
          </h1>

          <p class="clan-text">
            Ovdje su prikazani osnovni podaci odabranog člana teretane.
          </p>
        </div>

        <v-btn
            color="primary"
            prepend-icon="mdi-pencil"
            @click="urediClana()"
        >
          Uredi
        </v-btn>
      </div>

      <v-divider class="mb-6" />

      <v-tabs v-model="tab" class="mb-6">
        <v-tab value="info">
          Podaci
        </v-tab>

        <v-tab value="pretplate">
          Pretplate
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="info">
          <div v-if="loading">
            Učitavanje...
          </div>

          <div v-else class="info-grid">
            <div class="info-item">
              <span>ID</span>
              <strong>{{ clan.id }}</strong>
            </div>

            <div class="info-item">
              <span>Ime</span>
              <strong>{{ clan.ime }}</strong>
            </div>

            <div class="info-item">
              <span>Prezime</span>
              <strong>{{ clan.prezime }}</strong>
            </div>

            <div class="info-item">
              <span>E-pošta</span>
              <strong>{{ clan.email }}</strong>
            </div>

            <div class="info-item">
              <span>Mobitel</span>
              <strong>{{ clan.mobitel }}</strong>
            </div>

            <div class="info-item">
              <span>Datum učlanjenja</span>
              <strong>{{ clan.datum_uclanjenja }}</strong>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="pretplate">
          <v-data-table
              :items="pretplate"
              :headers="[
              { title: 'Datum početka', value: 'datum_pocetka' },
              { title: 'Datum završetka', value: 'datum_zavrsetka' },
            ]"
              class="clan-table"
          />
        </v-window-item>
      </v-window>

      <div class="clan-actions">
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
.clan-page {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding-top: 48px;
  padding-bottom: 48px;
}

.clan-box {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.clan-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.clan-text {
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

.clan-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}

.clan-table {
  background: white;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

:deep(.v-data-table) {
  background: white;
  color: black;
}

:deep(.v-data-table-header__content),
:deep(.v-data-table__td),
:deep(.v-tab) {
  color: black;
}
</style>
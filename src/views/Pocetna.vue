<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const loading = ref(false)

const broj = ref({
  clanovi: 0,
  treneri: 0,
  clanarine: 0,
})

async function loadDashboard() {
  loading.value = true

  try {
    const res = await api.get('/dashboard')

    broj.value = {
      clanovi: res.data.clanovi ?? 0,
      treneri: res.data.treneri ?? 0,
      clanarine: res.data.clanarine ?? 0,
    }
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

onMounted(() => {
  loadDashboard()
})
</script>

<template>
  <v-container fluid class="dashboard-page">
    <div class="dashboard-box">
      <h1 class="text-h4 font-weight-bold mb-2">
        Power House Gym
      </h1>

      <p class="dashboard-text">
        Dobrodošli u naš fitness sustav!
        Na ovoj naslovnoj stranici možete brzo vidjeti osnovne informacije o radu teretane. Prikazan je ukupan broj članova, trenera te aktivnih članarina, što omogućava jednostavan pregled trenutnog stanja. Sustav je osmišljen kako bi olakšao upravljanje i organizaciju svih aktivnosti unutar teretane.      </p>

      <v-row>
        <v-col cols="12" md="6">
          <v-card class="dashboard-card">
            <v-icon size="64" color="blue">
              mdi-account-group
            </v-icon>

            <div class="dashboard-title">
              Članovi
            </div>

            <div class="dashboard-number">
              {{ loading ? '...' : broj.clanovi }}
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="dashboard-card">
            <v-icon size="64" color="blue">
              mdi-whistle
            </v-icon>

            <div class="dashboard-title">
              Treneri
            </div>

            <div class="dashboard-number">
              {{ loading ? '...' : broj.treneri }}
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="dashboard-card dashboard-card-wide">
            <v-icon size="64" color="blue">
              mdi-card-account-details
            </v-icon>

            <div class="dashboard-title">
              Članarine
            </div>

            <div class="dashboard-number">
              {{ loading ? '...' : broj.clanarine }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.dashboard-page {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding-top: 48px;
  padding-bottom: 48px;
}

.dashboard-box {
  max-width: 1050px;
  margin: 0 auto;
  color: black;
}

.dashboard-text {
  font-size: 18px;
  margin-bottom: 32px;
  color: #333333;
}

.dashboard-card {
  min-height: 240px;
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
}

.dashboard-card-wide {
  min-height: 210px;
}

.dashboard-title {
  margin-top: 18px;
  font-size: 24px;
  font-weight: 600;
  color: black;
}

.dashboard-number {
  margin-top: 12px;
  font-size: 36px;
  font-weight: 700;
  color: black;
}
</style>
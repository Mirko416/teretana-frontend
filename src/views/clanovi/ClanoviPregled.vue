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
  <v-card max-width="700">
    <v-card-title class="d-flex align-center">
      Pregled člana

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-pencil"
        @click="urediClana()"
      >
        Uredi
      </v-btn>

      <v-tabs v-model="tab" class="mt-2">
        <v-tab value="info">Podaci</v-tab>
        <v-tab value="pretplate">Pretplate</v-tab>
      </v-tabs>
    </v-card-title>

    <v-window v-model="tab">

      <v-window-item value="info">
        <v-card-text v-if="loading">
          Učitavanje...
        </v-card-text>

        <v-card-text v-else>
          <p><strong>ID:</strong> {{ clan.id }}</p>
          <p><strong>Ime:</strong> {{ clan.ime }}</p>
          <p><strong>Prezime:</strong> {{ clan.prezime }}</p>
          <p><strong>E-pošta:</strong> {{ clan.email }}</p>
          <p><strong>Mobitel:</strong> {{ clan.mobitel }}</p>
          <p><strong>Datum učlanjenja</strong> {{ clan.datum_uclanjenja }}</p>
        </v-card-text>
      </v-window-item>

      <v-window-item value="pretplate">
        <v-card-text>
          <v-data-table
            :items="pretplate"
            :headers="[
                { title: 'Datum početka', value: 'datum_pocetka'},
                { title: 'Datum završetka', value: 'datum_zavrsetka'},
             ]"
            />
        </v-card-text>
      </v-window-item>
    </v-window>


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
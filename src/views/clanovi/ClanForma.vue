<script setup lang="ts">
import { computed, onMounted, reactive, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api.ts'

const API_URL = 'http://localhost:5000'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const menu = ref(false)

const clan = reactive<any>({
  ime: '',
  prezime: '',
  email: '',
  mobitel: '',
  datum_uclanjenja: null,
})

const jeUredivanje = computed(() => !!route.params.id)
const naslov = computed(() => jeUredivanje.value ? 'Uredi člana' : 'Dodaj člana')
const tekstGumba = computed(() => jeUredivanje.value ? 'Spremi člana' : 'Spremi člana')
const form = ref({
  ime: '',
  prezime: '',
  email: '',
  mobitel: '',
  datum_uclanjenja: ''
})

onMounted(async () => {
  if (route.params.id) {
    const res = await api.get(`/clanovi/${route.params.id}`)
    form.value = res.data
  }
})

async function dohvatiClana() {
  if (!route.params.id) {
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanovi/${route.params.id}`)
    const data = await response.json()

    if (data.datum_uclanjenja) {
      data.datum_uclanjenja = data.datum_uclanjenja.split('T')[0]
    }

    Object.assign(clan, data)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

async function spremiClana() {
  loading.value = true

  const url = jeUredivanje.value
  ? `${API_URL}/clanovi/${route.params.id}`
  : `${API_URL}/clanovi`

  const method = jeUredivanje.value ? 'PUT' : 'POST'

  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clan),
    })

    router.push('/clanovi')
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

function odustani() {
    router.push('/clanovi')
}

onMounted(async () => {
  await dohvatiClana()
})

async function spremi() {
  if (route.params.id) {
    await api.put('/clanovi${route.params.id}', form.value)
  } else {
    await api.post('/clanovi', form.value)
  }
  router.push('/clanovi')
}
</script>

<template>
  <v-container fluid class="clan-form-page">
    <div class="clan-form-box">
      <div class="clan-form-header">
        <h1 class="text-h4 font-weight-bold">
          {{ naslov }}
        </h1>

        <p class="clan-form-text">
          Ovdje možeš dodati novog člana ili urediti podatke postojećeg člana.
        </p>
      </div>

      <v-divider class="mb-6" />

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              v-model="clan.ime"
              label="Ime"
              prepend-inner-icon="mdi-account"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="clan.prezime"
              label="Prezime"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="clan.email"
              label="E-pošta"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="clan.mobitel"
              label="Mobitel"
              prepend-inner-icon="mdi-phone"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12">
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                  v-model="clan.datum_uclanjenja"
                  label="Datum učlanjenja"
                  prepend-inner-icon="mdi-calendar"
                  variant="outlined"
                  readonly
                  v-bind="props"
              />
            </template>

            <v-date-picker
                v-model="clan.datum_uclanjenja"
                @update:modelValue="val => {
                  clan.datum_uclanjenja = new Date(val).toISOString().split('T')[0]
                  menu = false
                }"
            />
          </v-menu>
        </v-col>
      </v-row>

      <div class="clan-form-actions">
        <v-btn
            variant="text"
            @click="odustani"
        >
          Odustani
        </v-btn>

        <v-btn
            color="primary"
            :loading="loading"
            @click="spremiClana()"
        >
          {{ tekstGumba }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.clan-form-page {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding-top: 48px;
  padding-bottom: 48px;
}

.clan-form-box {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.clan-form-header {
  margin-bottom: 24px;
}

.clan-form-text {
  font-size: 18px;
  color: #333333;
  margin-top: 8px;
  margin-bottom: 0;
}

.clan-form-actions {
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
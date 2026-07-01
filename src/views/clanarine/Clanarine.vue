<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const clanarine = ref<any[]>([])
const clanarina_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'Naziv', value: 'naziv' },
  { title: 'Cijena', value: 'cijena' },
  { title: 'Akcije', value: 'actions', sortable: false }
]

async function dohvatiClanarine() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanarine?q=${encodeURIComponent(pretraga.value)}`)
    clanarine.value = await response.json()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function idiNaDodavanje() {
  router.push('/clanarine/dodaj')
}

async function pretraziClanarine() {
  await dohvatiClanarine()
}

function pregledaj(clanarina: any) {
  router.push(`/clanarine/${clanarina.id}`)
}

function uredi(clanarina: any) {
  router.push(`/clanarine/${clanarina.id}/uredi`)
}

function otvoriBrisanje(clanarina: any) {
  clanarina_za_brisanje.value = clanarina
  prikazi_dialog_brisanje.value = true
}

function zatvoriBrisanje() {
  clanarina_za_brisanje.value = null
  prikazi_dialog_brisanje.value = false
}

async function obrisiClanarinu() {
  if (!clanarina_za_brisanje.value) {
    return
  }

  loading.value = true

  try {
    await fetch(`${API_URL}/clanarine/${clanarina_za_brisanje.value.id}`,{
      method: 'DELETE',
    })

    await dohvatiClanarine()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  zatvoriBrisanje()
}

onMounted(async () => {
  await dohvatiClanarine()
})
</script>

<template>
  <v-container fluid class="page-gray">
    <div class="page-box">
      <div class="page-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Članarine
          </h1>

          <p class="page-text">
            Pregled članarina!
            Ovdje su prikazane sve aktivne i prethodne članarine članova teretane. Svaka članarina sadrži osnovne podatke poput naziva, trajanja i cijene, što omogućava lakše praćenje i organizaciju. Sustav pruža mogućnost izmjene postojećih podataka ili uklanjanja članarina, čime se održava uredna i točna evidencija.          </p>
        </div>

        <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            @click="idiNaDodavanje"
        >
          Dodaj
        </v-btn>
      </div>

      <v-divider class="mb-6" />

      <v-text-field
          v-model="pretraga"
          label="Pretraži članarine"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          class="mb-6"
          @update:model-value="pretraziClanarine"
      />

      <v-data-table
          :headers="headers"
          :items="clanarine"
          :loading="loading"
          class="page-table"
      >
        <template #item.actions="{ item }">
          <v-tooltip text="Pregledaj">
            <template #activator="{ props }">
              <v-btn
                  v-bind="props"
                  icon="mdi-eye"
                  size="small"
                  variant="text"
                  color="primary"
                  @click="pregledaj(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Uredi">
            <template #activator="{ props }">
              <v-btn
                  v-bind="props"
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  color="primary"
                  @click="uredi(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Obriši">
            <template #activator="{ props }">
              <v-btn
                  v-bind="props"
                  icon="mdi-delete"
                  size="small"
                  variant="text"
                  color="red"
                  @click="otvoriBrisanje(item)"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>
  </v-container>

  <v-dialog
      v-model="prikazi_dialog_brisanje"
      max-width="500"
  >
    <v-card>
      <v-card-title>
        Potvrda brisanja
      </v-card-title>

      <v-card-text>
        Jeste li sigurni da želite obrisati članarinu?
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
            variant="text"
            @click="zatvoriBrisanje"
        >
          Odustani
        </v-btn>

        <v-btn
            color="red"
            :loading="loading"
            @click="obrisiClanarinu()"
        >
          Obriši
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

.page-table {
  background: white;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 8px;
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
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const treninzi = ref<any[]>([])
const trening_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'Član', value: 'clan' },
  { title: 'Trener', value: 'trener' },
  { title: 'Opis', value: 'opis' },
  { title: 'Datum', value: 'datum'},
  { title: 'Akcije', key: 'actions', sortable: false}
]

async function dohvatiTreninge() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/treninzi?q=${encodeURIComponent(pretraga.value)}`)
    const data = await response.json()
    treninzi.value = data.items ?? data

    console.log(treninzi.value)

  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function idiNaDodavanje() {
  router.push('/treninzi/dodaj')
}

async function pretraziTreninge() {
  await dohvatiTreninge()
}

function pregledaj(trening: any) {
  router.push(`/treninzi/${trening.id}`)
}

function uredi(trening: any) {
  router.push(`/treninzi/${trening.id}/uredi`)
}

function otvoriBrisanje(trening: any) {
  trening_za_brisanje.value = trening
  prikazi_dialog_brisanje.value = true
}

function zatvoriBrisanje() {
  trening_za_brisanje.value = null
  prikazi_dialog_brisanje.value = false
}

async function obrisiTreninge() {
  if (!trening_za_brisanje.value) {
    return
  }

  loading.value = true

  try {
    await fetch(`${API_URL}/treninzi/${trening_za_brisanje.value.id}`, {
      method: 'DELETE',
    })

    await dohvatiTreninge()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  zatvoriBrisanje()
}

onMounted(async () => {
  await dohvatiTreninge()
})

</script>

<template>
  <v-container fluid class="page-gray">
    <div class="page-box">
      <div class="page-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Treninzi
          </h1>

          <p class="page-text">
            Evidencija treninga!
            U ovom dijelu aplikacije vodi se pregled svih održanih i planiranih treninga. Za svaki trening dostupne su ključne informacije poput člana, trenera, opisa i datuma. Sustav omogućava jednostavno uređivanje postojećih zapisa ili njihovo brisanje, čime se osigurava točnost i ažurnost podataka o aktivnostima u teretani.          </p>
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
          label="Pretraži treninge"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          class="mb-6"
          @update:model-value="pretraziTreninge"
      />

      <v-data-table
          :headers="headers"
          :items="treninzi"
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
        Jeste li sigurni da želite obrisati trening?
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
            @click="obrisiTreninge"
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
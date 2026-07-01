<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const treneri = ref<any[]>([])
const trener_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'Ime', value: 'ime' },
  { title: 'Prezime', value: 'prezime' },
  { title: 'Specijalizacija', value: 'specijalizacija' },
  { title: 'Akcije', key: 'actions', sortable: false}
]

async function dohvatiTrenere() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/treneri?q=${encodeURIComponent(pretraga.value)}`)
    const data = await response.json()
    treneri.value = data.items

    console.log(treneri.value)

  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function idiNaDodavanje() {
  router.push('/treneri/dodaj')
}

async function pretraziTrenere() {
  await dohvatiTrenere()
}

function pregledaj(trener: any) {
  router.push(`/treneri/${trener.id}`)
}

function uredi(trener: any) {
  router.push(`/treneri/${trener.id}/uredi`)
}

function otvoriBrisanje(trener: any) {
  trener_za_brisanje.value = trener
  prikazi_dialog_brisanje.value = true
}

function zatvoriBrisanje() {
  trener_za_brisanje.value = null
  prikazi_dialog_brisanje.value = false
}

async function obrisiTrenera() {
  if (!trener_za_brisanje.value) {
    return
  }

  loading.value = true

  try {
    await fetch(`${API_URL}/treneri/${trener_za_brisanje.value.id}`, {
      method: 'DELETE',
    })

    await dohvatiTrenere()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  zatvoriBrisanje()
}

onMounted(async () => {
  await dohvatiTrenere()
})

</script>

<template>
  <v-container fluid class="page-gray">
    <div class="page-box">
      <div class="page-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Treneri
          </h1>

          <p class="page-text">
            Pregled trenera!
            Ovdje je prikazan popis svih trenera koji rade u teretani, zajedno s njihovim osnovnim informacijama i područjem rada. Sustav omogućava jednostavan pristup podacima, kao i njihovo ažuriranje ili uklanjanje kada je potrebno. Na taj način osigurana je preglednost i bolja kontrola nad organizacijom trenerskog kadra.          </p>
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
          label="Pretraži trenere"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          class="mb-6"
          @update:model-value="pretraziTrenere"
      />

      <v-data-table
          :headers="headers"
          :items="treneri"
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
        Jeste li sigurni da želite obrisati trenera?
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
            @click="obrisiTrenera"
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
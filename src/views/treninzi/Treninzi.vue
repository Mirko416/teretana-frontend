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
  <v-card>
    <v-card-title class="d-flex align-center">
      Treninzi

      <v-spacer />

      <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="idiNaDodavanje"
      >
        Dodaj
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-text-field
          v-model="pretraga"
          label="Pretraži treninge"
          prepend-inner-icon="mdi-magnify"
          clearable
          class="mb-4"
          @update:model-value="pretraziTreninge"
      />

      <v-data-table
          :headers="headers"
          :items="treninzi"
          :loading="loading"
      >
        <template #item.actions="{ item }">
          <v-tooltip text="Pregledaj">
            <template #activator="{ props }">
              <v-btn
                  v-bind="props"
                  icon="mdi-eye"
                  size="small"
                  variant="text"
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
                  @click="otvoriBrisanje(item)"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

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